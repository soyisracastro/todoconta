import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { getEmailTemplate } from '../../../lib/email-templates';

// Note: These will only work in serverless environments
// For static deployment, you'll need to use a serverless platform like Vercel or Netlify
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key');
const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET || 'your_webhook_secret';

// Initialize AWS SES client
const sesClient = new SESClient({
  region: import.meta.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID || 'your_access_key',
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY || 'your_secret_key',
  },
});

// Email templates for different product types
// Function to send email via AWS SES
async function sendEmail(to: string, subject: string, htmlBody: string, textBody?: string) {
  const params = {
    Source: import.meta.env.AWS_SES_FROM_EMAIL || 'noreply@todoconta.com',
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
        ...(textBody && {
          Text: {
            Data: textBody,
            Charset: 'UTF-8',
          },
        }),
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);
    console.log('Email sent successfully:', result.MessageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}


export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig || !endpointSecret) {
      return new Response('Webhook signature missing', { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return new Response('Webhook signature verification failed', { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract metadata
        const productId = session.metadata?.productId;
        const planId = session.metadata?.planId;
        const customerEmail = session.metadata?.customerEmail;

        if (productId && customerEmail) {
          try {
            // Get product data
            const { getCollection } = await import('astro:content');
            const products = await getCollection('products');
            const product = products.find(p => p.slug === productId);

            if (product) {
              const productData = product.data;
              let planData;

              // Find plan data
              if (productData.plans) {
                planData = productData.plans.find((p: any) => p.id === planId || p.title === planId);
              } else if (productData.price && planId === 'single') {
                planData = {
                  title: productData.title,
                  price: productData.price,
                  pricePeriod: productData.pricePeriod
                };
              }

              if (planData) {
                // Generate email content
                const emailContent = getEmailTemplate(productData, planData, customerEmail);

                // Send email via AWS SES
                try {
                  await sendEmail(
                    customerEmail,
                    emailContent.subject,
                    emailContent.html,
                    emailContent.subject // Use subject as text fallback
                  );

                  console.log(`Email sent successfully to ${customerEmail} for product ${productData.title}`);
                } catch (emailError) {
                  console.error('Failed to send email:', emailError);
                  // Note: You might want to implement a retry mechanism or queue system here
                }
              }
            }
          } catch (error) {
            console.error('Error processing webhook:', error);
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook error', { status: 500 });
  }
};