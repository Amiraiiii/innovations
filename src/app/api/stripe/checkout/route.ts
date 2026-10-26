import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { uzsToUsd, DEFAULT_USD_TO_UZS_RATE } from '@/lib/currency';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items = [], orderId = 'LM-TEST', customerEmail, deliveryCost = 0 } = body;

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Нормализуем товары: в cart лежат элементы { product: {...}, quantity: number } или { name, price, quantity }
    const normalizedItems = items.map((it: any) => {
      const product = it.product || it;
      const quantity = Number(it.quantity) || 1;
      const price = Number(product.price) || 0;
      const name = String(product.name || 'Товар LUMI');
      const image = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || '');

      return {
        name,
        price,
        quantity,
        image,
      };
    });

    const totalUzs = normalizedItems.reduce((sum: number, it: any) => sum + (it.price * it.quantity), 0) + deliveryCost;
    const totalUsd = uzsToUsd(totalUzs);

    // Если тестовый ключ Stripe не задан, возвращаем симулятор
    if (!stripe || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        simulated: true,
        checkoutUrl: `${origin}/checkout/stripe-mock?orderId=${encodeURIComponent(orderId)}&amountUzs=${encodeURIComponent(totalUzs)}&amountUsd=${encodeURIComponent(totalUsd)}`,
      });
    }

    // Собираем line_items для Stripe в USD
    const line_items: any[] = normalizedItems.map((item: any) => {
      const priceInUsd = uzsToUsd(item.price);
      // Stripe принимает сумму в центах (минимум 50 центов)
      const unitAmountInCents = Math.max(50, Math.round(priceInUsd * 100));

      const lineItem: any = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.name} (${item.price.toLocaleString('ru-RU')} сум)`,
          },
          unit_amount: unitAmountInCents,
        },
        quantity: item.quantity,
      };

      // Добавляем картинку только если это валидный http URL
      if (item.image && typeof item.image === 'string' && (item.image.startsWith('http://') || item.image.startsWith('https://'))) {
        lineItem.price_data.product_data.images = [item.image];
      }

      return lineItem;
    });

    if (deliveryCost > 0) {
      const deliveryInUsd = uzsToUsd(deliveryCost);
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Курьерская доставка (${deliveryCost.toLocaleString('ru-RU')} сум)`,
          },
          unit_amount: Math.max(50, Math.round(deliveryInUsd * 100)),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: customerEmail && customerEmail.includes('@') ? customerEmail : undefined,
      metadata: {
        orderId,
        totalUzs: String(totalUzs),
        totalUsd: String(totalUsd),
        exchangeRate: String(DEFAULT_USD_TO_UZS_RATE),
      },
      success_url: `${origin}/checkout/success?orderId=${encodeURIComponent(orderId)}&stripe_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true&orderId=${encodeURIComponent(orderId)}`,
    });

    return NextResponse.json({
      simulated: false,
      checkoutUrl: session.url,
      sessionId: session.id,
      totalUsd,
      totalUzs,
      exchangeRate: DEFAULT_USD_TO_UZS_RATE,
    });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Ошибка создания платёжной сессии Stripe' },
      { status: 500 }
    );
  }
}
