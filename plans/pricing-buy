import type { APIRoute } from 'astro';

interface SubscriptionRequest {
  plan: string;
  price: string;
  captchaToken: string;
}

interface HCaptchaResponse {
  success: boolean;
  'error-codes'?: string[];
  hostname?: string;
}

export const POST: APIRoute = async ({ request, clientAddress, locals }) => {
  try {
    // Get hCaptcha credentials from environment variables
    const HCAPTCHA_SECRET = 
      locals?.runtime?.env?.HCAPTCHA_SECRET || 
      import.meta.env.HCAPTCHA_SECRET;
    
    const HCAPTCHA_SITEKEY = 
      locals?.runtime?.env?.HCAPTCHA_SITEKEY || 
      import.meta.env.HCAPTCHA_SITEKEY;

    // Validate environment variables are set
    if (!HCAPTCHA_SECRET || !HCAPTCHA_SITEKEY) {
      console.error('Missing hCaptcha environment variables');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Server configuration error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const body = await request.json() as SubscriptionRequest;
    const { plan, price, captchaToken } = body;

    // Validate required fields
    if (!plan || !price || !captchaToken) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify hCaptcha token
    const verifyUrl = 'https://api.hcaptcha.com/siteverify';
    const formData = new URLSearchParams();
    formData.append('secret', HCAPTCHA_SECRET);
    formData.append('response', captchaToken);
    formData.append('remoteip', clientAddress || '');
    formData.append('sitekey', HCAPTCHA_SITEKEY);

    const captchaResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const captchaResult = await captchaResponse.json() as HCaptchaResponse;

    if (!captchaResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Captcha verification failed. Please try again.',
          errors: captchaResult['error-codes'],
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // TODO: Here you would integrate with your payment processor
    // For now, we'll just log the successful verification
    console.log('Subscription request:', {
      plan,
      price,
      timestamp: new Date().toISOString(),
      captchaVerified: true,
      hostname: captchaResult.hostname,
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully verified subscription to ${plan} plan!`,
        data: {
          plan,
          price,
          verifiedAt: new Date().toISOString(),
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred processing your subscription',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
