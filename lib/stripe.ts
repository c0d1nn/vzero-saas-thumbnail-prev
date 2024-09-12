import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string;
  domainUrl: string;
  customerId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [{ price: priceId, quantity: 1 }],
    payment_method_types: ["card"],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
  });

  return session.url as string;
};

export async function createCustomerPortal(): Promise<string> {
  // Implement the logic to create a Stripe customer portal session
  // This is a placeholder implementation
  const session = await stripe.billingPortal.sessions.create({
    customer: 'cus_xxx', // Replace with actual customer ID
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/settings`,
  });
  return session.url;
}
