export async function generateCaptcha() {
  return new Promise<string>((resolve, reject) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        reject(new Error("Missing reCAPTCHA site key"));
        return;
      }

      const token = await grecaptcha.execute(siteKey, {
        action: "submit",
      });

      resolve(token);
    });
  });
}
