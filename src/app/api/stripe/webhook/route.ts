import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET || !sig) {
      // Имитация или отсутствие секрета вебхука
      return NextResponse.json({ received: true, note: 'No webhook secret configured, skipping verification' });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
      console.error(`Webhook signature verification failed:`, err.message);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Обработка успешной оплаты
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const orderId = session.metadata?.orderId;
      console.log(`[Stripe Webhook] Заказ ${orderId} успешно оплачен через Stripe! Session: ${session.id}`);
      // Здесь при наличии Neon PostgreSQL будет:
      // await prisma.order.update({ where: { id: orderId }, data: { paymentStatus: 'PAID', status: 'Оплачен' } })
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Stripe webhook processing error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
