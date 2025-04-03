export const APP_ROUTES = {
  private: [],
  public: {
    dashboard: "/",
    auth: {
      confirmEmail: "/auth/confirm-email",
      forgotPassword: "/auth/forgot-password",
      signIn: "/auth/sign-in",
      signUp: "/auth/sign-up",
    },
    businessPoint: {
      details: "/details",
      registerBusinessPoint: "/register-business-point",
      registerDetails: "/registerDetails",
      saveImage: "/save-image",
      update: "/update",
    },
    user: {
      myBusinessPoints: "/my-business-points",
      profile: "/profile",
    },
    mapCity: "/map-city",
  },
};
