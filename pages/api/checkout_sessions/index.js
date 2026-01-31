import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FREE_SHIPPING_THRESHOLD_CENTS = 4000; // 40€
const SHIPPING_PRICE_ID = process.env.STRIPE_SHIPPING_PRICE_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { items = [], subtotalInCents = 0, metadata = {} } = req.body || {};

    const lineItems = [...items];

    if (
      SHIPPING_PRICE_ID &&
      subtotalInCents > 0 &&
      subtotalInCents < FREE_SHIPPING_THRESHOLD_CENTS
    ) {
      lineItems.push({ price: SHIPPING_PRICE_ID, quantity: 1 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
      metadata: typeof metadata === 'object' ? metadata : {},
      locale: 'fr',
    });

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
