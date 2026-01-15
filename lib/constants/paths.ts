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
  placeOrder: '/place-order',

  orderDetails: (orderId: string) => `/order/${orderId}`,

  myOrders: '/my-orders',

  userProfile: '/user/profile',

  admin: {
    overview: '/admin/overview',
  },
} as const;
