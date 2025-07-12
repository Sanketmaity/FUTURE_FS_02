# Music Store E-commerce Website

A complete e-commerce solution for musical instruments built with React, TypeScript, Tailwind CSS, and Clerk authentication.

## 🎵 Features

- **Product Catalog**: Browse musical instruments with advanced search and filtering
- **Shopping Cart**: Add items, adjust quantities, and manage your cart
- **User Authentication**: Secure authentication powered by Clerk with social logins
- **Order Management**: Track order history and status
- **Payment Processing**: Stripe integration for secure payments
- **Email Subscription**: Newsletter signup functionality
- **Responsive Design**: Optimized for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Clerk account for authentication
- Stripe account for payment processing

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Clerk Authentication Setup

### Getting Your Clerk Keys

1. Create a [Clerk account](https://clerk.com)
2. Create a new application in your Clerk dashboard
3. Go to **API Keys** in your Clerk dashboard
4. Copy your **Publishable Key** (starts with `pk_test_`)
5. Add it to your `.env` file as `VITE_CLERK_PUBLISHABLE_KEY`

### Authentication Features

- **Social Logins**: Google, GitHub, Discord, and more
- **Email/Password**: Traditional email and password authentication
- **Magic Links**: Passwordless authentication via email
- **Multi-factor Authentication**: Optional 2FA for enhanced security
- **User Management**: Complete user profile management
- **Session Management**: Secure session handling

## 🔧 Stripe Configuration

### Where to Put Your Secret Key

1. **Environment Variables (.env file)**:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

2. **Payment Service (src/services/paymentService.ts)**:
   Replace the placeholder in the PaymentService class:
   ```typescript
   private static STRIPE_SECRET_KEY = 'sk_test_your_actual_secret_key_here';
   ```

### Getting Your Stripe Keys

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Go to [Developers > API Keys](https://dashboard.stripe.com/apikeys)
3. Copy your **Publishable key** and **Secret key**
4. Use the **test keys** for development (they start with `pk_test_` and `sk_test_`)

### Security Note

- **Never expose your secret key in client-side code**
- In production, always use environment variables
- The secret key should only be used on your backend server
- This demo includes client-side usage for demonstration purposes only

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer components
│   ├── PaymentForm.tsx # Stripe payment form
│   └── ProductCard.tsx # Product display component
├── context/            # React Context for state management
├── data/              # Mock data and constants
├── pages/             # Page components (Home, Products, Cart, etc.)
├── services/          # API services (Payment, etc.)
├── types/             # TypeScript type definitions
└── config/            # Configuration files
```

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Stripe** - Payment processing
- **Lucide React** - Icons
- **Vite** - Build tool

## 💳 Payment Testing

Use these test card numbers in development:

- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **American Express**: 3782 822463 10005
- **Declined**: 4000 0000 0000 0002

Use any future expiry date and any 3-digit CVV.

## 🔒 Security Features

- Secure payment processing with Stripe
- Input validation and sanitization
- Protected routes for authenticated users
- Encrypted payment data transmission
- HTTPS enforcement in production

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Design System

- **Colors**: Blue (#1e40af), Purple (#7c3aed), Gold (#f59e0b)
- **Typography**: System fonts with excellent readability
- **Spacing**: 8px grid system
- **Components**: Consistent design patterns throughout

## 📄 License

This project is licensed under the MIT License.