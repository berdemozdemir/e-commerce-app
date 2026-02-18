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
    orders: '/admin/orders',
    users: {
      list: '/admin/user/list',
      detail: (userId: string) => `/admin/user/${userId}`,
    },
    product: {
      list: '/admin/product/list',
      create: '/admin/product/create',
      update: (slug: string) => `/admin/product/${slug}`,
    },
  },

  unauthorized: '/unauthorized',

  notFound: '/not-found',
} as const;
