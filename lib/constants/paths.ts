export const paths = {
  home: '/',

  cart: '/cart',
  products: '/products',
  productDetail: (slug: string) => `/products/${slug}`,

  auth: {
    login: '/auth/login',
    signup: '/auth/sign-up',
  },
};
