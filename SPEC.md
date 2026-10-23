# SPEC --- техническая спецификация

## 1. Предлагаемый стек

-   Frontend: Next.js + TypeScript.
-   Стили: CSS Modules или Tailwind CSS (выбрать один).
-   Анимации: Motion for React, если используется React.
-   Сервер: маршруты API Next.js для MVP либо отдельный API при росте
    проекта.
-   База данных: Neon (Serverless PostgreSQL); ORM: Prisma.
-   Авторизация: проверенная библиотека с email и Google OAuth.
-   Тесты: unit-тесты бизнес-правил и end-to-end тесты покупки. Стек ---
    рекомендация; перед стартом проверить актуальную документацию и
    совместимость.

## 2. Основные маршруты

`/`, `/catalog`, `/catalog/[categorySlug]`, `/product/[slug]`,
`/search?q=...`, `/cart`, `/checkout`, `/auth/sign-in`, `/auth/sign-up`,
`/auth/forgot-password`, `/account`, `/account/profile`,
`/account/security`, `/account/orders`, `/account/orders/[id]`,
`/admin`, `/admin/products`, `/admin/categories`, `/admin/orders`.

## 3. Модели данных

-   **User:** id, name, email, passwordHash (может быть пустым для
    OAuth), avatarUrl, role (`CUSTOMER`/`ADMIN`), createdAt, updatedAt.
-   **Category:** id, name, slug, description, imageUrl, isActive,
    sortOrder.
-   **Product:** id, categoryId, name, slug, description, priceMinor,
    currency, stock, images, specifications, isPublished.
-   **Order:** id, userId, status, paymentStatus, currency,
    subtotalMinor, deliveryMinor, totalMinor, deliveryAddress,
    contactPhone, timestamps.
-   **OrderItem:** id, orderId, productId, productNameSnapshot,
    unitPriceMinor, quantity, lineTotalMinor.
-   **Payment:** id, orderId, provider, providerPaymentId, status,
    amountMinor, currency, timestamps. Деньги хранить в минимальных
    единицах валюты или точном decimal-типе, не в неточных float. Не
    хранить номера карт, CVV или секреты платёжного провайдера.

## 4. API-контракты (предварительно)

-   `GET /api/products` --- список, поиск, фильтры и сортировка.
-   `GET /api/products/:idOrSlug` --- товар.
-   `GET /api/categories` --- категории.
-   `POST /api/orders` --- сервер проверяет цены/остатки и создаёт
    заказ.
-   `GET /api/orders` и `GET /api/orders/:id` --- только собственные
    заказы или доступ администратора.
-   `PATCH /api/account/profile` --- изменение разрешённых полей.
-   `POST /api/account/change-password` --- смена пароля.
-   `POST /api/account/avatar` --- безопасная загрузка аватара.
-   `POST /api/payments/yookassa/create` --- будущий серверный endpoint
    создания платежа.
-   `POST /api/payments/yookassa/webhook` --- будущая обработка
    подтверждений провайдера. Каждый admin endpoint требует серверной
    проверки роли. Формат ошибок должен быть единообразным.

## 5. Безопасность

Использовать проверенную auth-библиотеку, хранить пароли только в виде
хеша, проверять Google OAuth на сервере, включить подходящие настройки
сессии/cookie, ограничивать частоту чувствительных запросов и
валидировать данные на сервере. Роль ADMIN нельзя выбрать через
публичную форму. Секреты нельзя помещать в публичные frontend-переменные
или Git.

## 6. Корзина, заказ и оплата

Перед созданием заказа сервер заново получает товары из базы, проверяет
публикацию, наличие, количество и цены, затем рассчитывает итог и
сохраняет позиции с ценами на момент покупки. Платёж создаётся на
сервере. Возврат на страницу «успех» сам по себе не доказывает оплату:
статус меняется только после доверенного подтверждения от YooKassa.
Нужно обрабатывать повторные уведомления и не создавать дубликаты.

## 7. Окружение

Создать `.env.example` с `DATABASE_URL`, `AUTH_SECRET`,
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `APP_URL`, а для будущего
этапа --- `YOOKASSA_SHOP_ID` и `YOOKASSA_SECRET_KEY`. В примере не
должно быть настоящих ключей.

## 8. Адаптивность и тестирование

Проверить экраны примерно 360, 768, 1024 px и широкие desktop.
Bento-секции на телефоне переходят в одну колонку. Проверить
клавиатурную навигацию, контраст и уменьшение анимации. Автоматически
протестировать сумму заказа, права доступа и путь «каталог → товар →
корзина → вход → заказ → история». Проверить, что обычный пользователь
не может вызвать admin API.

## 9. Будущие клиенты

Telegram Mini App и iOS должны использовать общие серверные правила и
API. Позже отдельно спроектировать безопасную аутентификацию Telegram и
мобильного приложения, версионирование API и обновление токенов. Не
полагаться на веб-cookie как на универсальную авторизацию.
