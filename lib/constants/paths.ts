export const paths = {
  auth: {
    login: '/auth/login',
    signup: '/auth/sign-up',
  },

  home: '/',

  cart: '/cart',
  products: '/products',
  productDetail: (slug: string) => `/products/${slug}`,

  shippingAddress: '/shipping-address',
  paymentMethod: '/payment-method',
} as const;
