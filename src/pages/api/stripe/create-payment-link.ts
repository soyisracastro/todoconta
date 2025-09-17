import type { APIRoute } from 'astro';
import Stripe from 'stripe';

// Disable prerendering for this endpoint
export const prerender = false;

// Initialize Stripe with better error handling
const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey || stripeSecretKey === 'your_stripe_secret_key') {
  console.error('STRIPE_SECRET_KEY is not configured properly');
}

const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder');

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check if Stripe is properly configured
    if (!stripeSecretKey || stripeSecretKey === 'your_stripe_secret_key' || stripeSecretKey === 'sk_test_placeholder') {
      console.error('Stripe secret key not configured');
      return new Response(
        JSON.stringify({
          error: 'Stripe configuration error',
          details: 'STRIPE_SECRET_KEY is not properly configured'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
      // Map planId to plan title for matching
      const planIdToTitle: { [key: string]: string } = {
        '1-licencia': '1 Licencia',
        '3-licencias': '3 Licencias',
        '5-licencias': '5 Licencias',
        'single': 'Licencia Individual'
      };

      const planTitle = planIdToTitle[planId] || planId;
      plan = productData.plans.find((p: any) => p.title === planTitle);
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

    // Determine payment type - for now, use one-time payments to avoid subscription management
    const paymentType = 'one-time'; // Changed from conditional logic to always use one-time payments

    let stripeProduct;

    // Create one-time payment product (simplified logic)
    const stripeProducts = await stripe.products.list({ limit: 100 });
    stripeProduct = stripeProducts.data.find(p => p.metadata.productId === productId && p.metadata.planId === planId);

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
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: plan.price * 100, // Convert to cents
      currency: 'mxn',
      metadata: {
        productId,
        planId
      }
    });

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

  } catch (error: any) {
    console.error('Error creating payment link:', error);

    // Provide specific error messages based on the error type
    let errorMessage = 'Failed to create payment link';
    let statusCode = 500;

    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = 'Invalid request to Stripe API';
      statusCode = 400;
    } else if (error.type === 'StripeAPIError') {
      errorMessage = 'Stripe API error';
      statusCode = 502;
    } else if (error.type === 'StripeConnectionError') {
      errorMessage = 'Connection error with Stripe';
      statusCode = 503;
    } else if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Stripe authentication failed - check your API keys';
      statusCode = 401;
    } else if (error.message?.includes('Invalid API Key')) {
      errorMessage = 'Invalid Stripe API key';
      statusCode = 401;
    } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
      errorMessage = 'Network error - check your internet connection';
      statusCode = 503;
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: error.message || 'Unknown error',
        type: error.type || 'UnknownError'
      }),
      { status: statusCode, headers: { 'Content-Type': 'application/json' } }
    );
  }
};