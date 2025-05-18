export const APP_ROUTES = {
  private: [],
  public: {
    dashboard: "/",
    prices: "/prices",
    auth: {
      confirmEmail: "/auth/confirm-email",
      forgotPassword: "/auth/forgot-password",
      signIn: "/auth/sign-in",
      signUp: "/auth/sign-up",
    },
    businessPoint: {
      details: "/business-point/details",
      registerBusinessPoint: "/business-point/register-business-point",
      registerDetails: "/business-point/register-details",
      saveImage: "/business-point/save-image",
      update: "/business-point/update",
    },
    user: {
      myBusinessPoints: "/user/my-business-points",
      profile: "/user/profile",
      myReviews: "/user/my-reviews",
    },
    mapCity: {
      allBusinessPoints: "/map-city/all-business-points",
      slugBusinessPoint: "/map-city",
    },
    showcase: "/showcase",
  },
};
