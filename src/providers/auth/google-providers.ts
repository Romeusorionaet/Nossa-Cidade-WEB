import { KeyCookies } from "@/constants/key-cookies";
import { api } from "@/lib/api";
import { setAuthTokenForCookies } from "@/utils/set-auth-token-for-cookies";
import type { AuthOptions } from "next-auth";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET_ID || "",
      wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
          ].join(" "),
          include_granted_scopes: "true",
          id: "google",
          name: "Google",
          type: "oauth",
          idToken: true,
          checks: ["pkce", "state"],
        },
      },
      async profile(profile: GoogleProfile) {
        try {
          if (profile.email_verified) {
            const response = await api.post(
              "/auth/authenticate/oauth/callback",
              {
                username: profile.name,
                email: profile.email,
                picture: profile.picture,
                emailVerified: profile.email_verified,
              },
            );

            const { accessToken, refreshToken } = await response.data;

            await setAuthTokenForCookies({
              token: accessToken,
              key: KeyCookies.AT_OC,
            });
            await setAuthTokenForCookies({
              token: refreshToken,
              key: KeyCookies.RT_OC,
            });
          }
        } catch (err: any) {
          console.error("Erro durante a autenticação OAuth:", err.message);
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user = { ...session.user, id: token.sub } as {
        id: string;
        name: string;
        email: string;
        image: string;
      };

      return session;
    },
  },
};
