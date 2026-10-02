/*
 * Site settings — edit these values, commit, and Vercel redeploys automatically.
 * Leave a link as "" to fall back to WhatsApp enrolment.
 */
window.SITE_CONFIG = {
  // Next cohort start (ISO format, Lagos time is +01:00). The countdown hides itself once this date passes.
  nextCohort: "2026-10-19T10:00:00+01:00",

  // WhatsApp number in international format, digits only (08028247290 -> 2348028247290)
  whatsapp: "2348028247290",
  phone: "+2348164046823",
  email: "info@mediagiantsenterprise.com",

  // Paste your WhatsApp community / group invite link here (https://chat.whatsapp.com/...)
  communityLink: "",

  // Paste Paystack or Flutterwave payment-page links here (e.g. https://paystack.com/pay/your-page)
  paymentLinks: {
    live: "https://flutterwave.com/pay/mediagiants-ads-masterclass",
    recorded: ""
  }
};
