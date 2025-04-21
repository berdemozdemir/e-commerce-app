export const paths = {
  home: '/',

  cart: '/cart',
  products: '/products',
  product: (id: string) => `/products/${id}`,

  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
  },
};
