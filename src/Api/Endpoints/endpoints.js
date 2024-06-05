export const endpoints = {
  auth: {
    register: "/register",
     updatePassword: "/update-password",
    forgetPassword: "/forget-password",
    dashboard: "/user/dashboard",
  },
  cms: {
    product: "/product",
    createProduct: "/create/product",
    delete:"/delete/product",
    update:"/update/product",
    single:"/edit/product"
  },
};

export const successNotification = [
  endpoints.auth.register,
  endpoints.auth.login,
  endpoints.auth.updatePassword,
  endpoints.auth.forgetPassword,
  endpoints.auth.dashboard,
  endpoints.cms.product,
  endpoints.cms.createProduct,
  endpoints.cms.delete,
  endpoints.cms.update,
  endpoints.cms.single
];
