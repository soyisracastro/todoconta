import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { getEmailTemplate } from '../../../lib/email-templates';

// Test endpoint for email debugging
export const GET: APIRoute = async () => {
  try {
    console.log('🧪 Testing email configuration...');

    // Check environment variables
    const envCheck = {
      AWS_ACCESS_KEY_ID: !!import.meta.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: !!import.meta.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: import.meta.env.AWS_REGION || 'us-east-1',
      AWS_SES_FROM_EMAIL: import.meta.env.AWS_SES_FROM_EMAIL || 'noreply@todoconta.com',
      STRIPE_SECRET_KEY: !!import.meta.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: !!import.meta.env.STRIPE_WEBHOOK_SECRET,
    };

    console.log('🔧 Environment variables check:', envCheck);

    // Show credential preview (first/last 4 chars)
    const accessKeyPreview = import.meta.env.AWS_ACCESS_KEY_ID
      ? `${import.meta.env.AWS_ACCESS_KEY_ID.substring(0, 4)}...${import.meta.env.AWS_ACCESS_KEY_ID.substring(import.meta.env.AWS_ACCESS_KEY_ID.length - 4)}`
      : 'NOT SET';

    const secretKeyPreview = import.meta.env.AWS_SECRET_ACCESS_KEY
      ? `${import.meta.env.AWS_SECRET_ACCESS_KEY.substring(0, 4)}...${import.meta.env.AWS_SECRET_ACCESS_KEY.substring(import.meta.env.AWS_SECRET_ACCESS_KEY.length - 4)}`
      : 'NOT SET';

    console.log('🔐 AWS Credentials preview:', {
      accessKey: accessKeyPreview,
      secretKey: secretKeyPreview,
      region: import.meta.env.AWS_REGION || 'us-east-1'
    });

    // Try to send a test email
    const testEmail = 'israel.castro@gmail.com'; // Change this to your verified email
    const testSubject = 'Test Email - Todoconta';
    const testHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Test Email Configuration</h2>
        <p>This is a test email to verify AWS SES configuration.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      </div>
    `;

    try {
      await sendEmail(testEmail, testSubject, testHtml);
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Test email sent successfully',
          envCheck,
          credentials: {
            accessKeyPreview,
            secretKeyPreview,
            region: import.meta.env.AWS_REGION || 'us-east-1'
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (emailError: any) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email sending failed - check AWS credentials',
          error: emailError.message,
          errorCode: emailError.Code || emailError.code,
          envCheck,
          credentials: {
            accessKeyPreview,
            secretKeyPreview,
            region: import.meta.env.AWS_REGION || 'us-east-1'
          },
          troubleshooting: {
            signatureError: 'If you see SignatureDoesNotMatch, your AWS credentials are invalid',
            steps: [
              'Go to AWS IAM Console',
              'Create an IAM user with SES permissions',
              'Use the Access Key ID and Secret Access Key',
              'Make sure the region matches your SES configuration'
            ]
          }
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Test failed',
        error: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Disable prerendering for this endpoint
export const prerender = false;

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
  console.log('🔄 Attempting to send email to:', to);
  console.log('📧 Subject:', subject);
  console.log('🔑 AWS SES From Email:', import.meta.env.AWS_SES_FROM_EMAIL || 'noreply@todoconta.com');
  console.log('🌍 AWS Region:', import.meta.env.AWS_REGION || 'us-east-1');

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
    console.log('✅ Email sent successfully:', result.MessageId);
    return result;
  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    console.error('❌ Error details:', {
      name: error.name,
      message: error.message,
      code: error.$metadata?.httpStatusCode,
      requestId: error.$metadata?.requestId
    });

    // Don't throw error in test mode to avoid breaking the webhook
    if (import.meta.env.DEV || import.meta.env.STRIPE_SECRET_KEY?.includes('test')) {
      console.log('🧪 Test mode: Email sending failed but webhook continues');
      return { testMode: true, error: error.message };
    }

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
      case 'checkout.session.completed': {
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
                console.log('🔍 Looking for plan:', planId);
                console.log('📋 Available plans:', productData.plans.map((p: any) => ({ title: p.title, id: p.id })));

                // Map planId to plan title for matching
                const planIdToTitle: { [key: string]: string } = {
                  '1-licencia': '1 Licencia',
                  '3-licencias': '3 Licencias',
                  '5-licencias': '5 Licencias',
                  'single': 'Licencia Individual'
                };

                const planTitle = planId ? (planIdToTitle[planId] || planId) : '';
                planData = productData.plans.find((p: any) => p.title === planTitle);

                console.log('🎯 Found plan:', planData ? planData.title : 'NOT FOUND');
              } else if (productData.price && planId === 'single') {
                planData = {
                  title: productData.title,
                  price: productData.price,
                  pricePeriod: productData.pricePeriod
                };
                console.log('🎯 Single product plan:', planData.title);
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
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook error', { status: 500 });
  }
};