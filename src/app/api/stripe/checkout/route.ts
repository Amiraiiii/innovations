import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, orderId, customerEmail, deliveryCost = 0 } = body;

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Если тестовый ключ Stripe не задан в .env, возвращаем симулированный Stripe Checkout
    if (!stripe || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        simulated: true,
        checkoutUrl: `${origin}/checkout/stripe-mock?orderId=${encodeURIComponent(orderId)}&amount=${encodeURIComponent(
          items.reduce((sum: number, it: any) => sum + (it.price * it.quantity), 0) + deliveryCost
        )}`,
      });
    }

    // Собираем line_items для Stripe в узбекских сумах (UZS)
    const line_items: any[] = items.map((item: any) => ({
      price_data: {
        currency: 'uzs',
        product_data: {
          name: item.name,
          images: item.image ? [item.image.startsWith('http') ? item.image : `${origin}${item.image}`] : [],
        },
        unit_amount: Math.round(item.price * 100), // в тийинах (копейках сума)
      },
      quantity: item.quantity,
    }));

    if (deliveryCost > 0) {
      line_items.push({
        price_data: {
          currency: 'uzs',
          product_data: {
            name: 'Курьерская доставка',
          },
          unit_amount: Math.round(deliveryCost * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: customerEmail || undefined,
      metadata: {
        orderId,
      },
      success_url: `${origin}/checkout/success?orderId=${encodeURIComponent(orderId)}&stripe_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true&orderId=${encodeURIComponent(orderId)}`,
    });

    return NextResponse.json({
      simulated: false,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('Stripe session error:', error);
    return NextResponse.json(
      { error: error?.message || 'Ошибка создания платёжной сессии Stripe' },
      { status: 500 }
    );
  }
}
