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
  search: {
    base: '/search',
    filters: (params: string) => `/search?${params}`,
  },

  admin: {
    overview: '/admin/overview',
    orders: '/admin/orders',
    users: {
      list: '/admin/users/list',
      detail: (userId: string) => `/admin/users/${userId}`,
    },
    products: {
      list: '/admin/products/list',
      create: '/admin/products/create',
      update: (slug: string) => `/admin/products/${slug}`,
    },
  },

  unauthorized: '/unauthorized',

  notFound: '/not-found',
} as const;
