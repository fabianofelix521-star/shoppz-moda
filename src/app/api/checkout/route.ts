import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items } = await request.json();

  if (!isStripeEnabled() || !stripe) {
    // Mock checkout - return a fake session
    return NextResponse.json({
      url: null,
      mock: true,
      message: "Stripe is not configured. Order will be processed as mock.",
    });
  }

  const lineItems = items.map(
    (item: {
      name: string;
      price: number;
      quantity: number;
      image?: string;
    }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }),
  );

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${request.nextUrl.origin}/checkout?success=true`,
    cancel_url: `${request.nextUrl.origin}/cart`,
    customer_email: session.user.email || undefined,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
