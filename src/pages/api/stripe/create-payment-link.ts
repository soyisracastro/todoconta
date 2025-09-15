import type { APIRoute } from 'astro';
import Stripe from 'stripe';

// Note: This will only work in serverless environments
// For static deployment, you'll need to use a serverless platform like Vercel or Netlify
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key');

export const POST: APIRoute = async ({ request }) => {
  try {
    const { productId, planId, customerEmail } = await request.json();

    if (!productId || !planId || !customerEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: productId, planId, customerEmail' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get product data from content collections
    const { getCollection } = await import('astro:content');
    const products = await getCollection('products');
    const product = products.find(p => p.slug === productId);

    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const productData = product.data;
    let plan;

    // Find the specific plan
    if (productData.plans) {
      plan = productData.plans.find((p: any) => p.id === planId || p.title === planId);
    } else if (productData.price && planId === 'single') {
      // Handle single price products
      plan = {
        title: productData.title,
        price: productData.price,
        pricePeriod: productData.pricePeriod,
        paymentType: 'one-time'
      };
    }

    if (!plan) {
      return new Response(
        JSON.stringify({ error: 'Plan not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine payment type and create appropriate Stripe product/price
    const paymentType = plan.pricePeriod?.toLowerCase().includes('anual') ? 'subscription' : 'one-time';

    let stripeProduct;
    let stripePrice;

    if (paymentType === 'subscription') {
      // Create or retrieve subscription product
      const products = await stripe.products.list({ limit: 100 });
      stripeProduct = products.data.find(p => p.metadata.productId === productId && p.metadata.planId === planId);

      if (!stripeProduct) {
        stripeProduct = await stripe.products.create({
          name: `${productData.title} - ${plan.title}`,
          description: productData.description,
          metadata: {
            productId,
            planId,
            paymentType: 'subscription'
          }
        });
      }

      // Create price for subscription (annual)
      stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: plan.price * 100, // Convert to cents
        currency: 'mxn',
        recurring: {
          interval: 'year',
          interval_count: 1
        },
        metadata: {
          productId,
          planId
        }
      });
    } else {
      // Create one-time payment product
      const products = await stripe.products.list({ limit: 100 });
      stripeProduct = products.data.find(p => p.metadata.productId === productId && p.metadata.planId === planId);

      if (!stripeProduct) {
        stripeProduct = await stripe.products.create({
          name: `${productData.title} - ${plan.title}`,
          description: productData.description,
          metadata: {
            productId,
            planId,
            paymentType: 'one-time'
          }
        });
      }

      // Create one-time price
      stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: plan.price * 100, // Convert to cents
        currency: 'mxn',
        metadata: {
          productId,
          planId
        }
      });
    }

    // Create payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: stripePrice.id,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${new URL(request.url).origin}/gracias?product=${productId}&plan=${planId}&session_id={CHECKOUT_SESSION_ID}`,
        },
      },
      metadata: {
        productId,
        planId,
        customerEmail,
        paymentType
      },
    });

    return new Response(
      JSON.stringify({
        url: paymentLink.url,
        paymentLinkId: paymentLink.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating payment link:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create payment link' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};