import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

function createStripeClient(): Stripe | null {
  if (!stripeSecretKey || stripeSecretKey === "sk_test_placeholder") {
    return null;
  }
  return new Stripe(stripeSecretKey, { apiVersion: "2026-02-25.clover" });
}

export const stripe = createStripeClient();

export function isStripeEnabled(): boolean {
  return stripe !== null;
}
