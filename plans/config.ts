import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  // Get hCaptcha site key from environment variables (safe to expose to client)
  const HCAPTCHA_SITEKEY = 
    locals?.runtime?.env?.HCAPTCHA_SITEKEY || 
    import.meta.env.HCAPTCHA_SITEKEY;

  if (!HCAPTCHA_SITEKEY) {
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

  return new Response(
    JSON.stringify({
      sitekey: HCAPTCHA_SITEKEY,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
