import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import {
  anonymous,
  admin,
  phoneNumber,
  apiKey,
  organization,
} from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db";
import * as schema from "../db/schema";
import { sendVerificationEmail } from "../email";
import { ac, adminRole, userRole, customRole } from "./permissions";

export const auth = betterAuth({
  appName: process.env.APP_NAME!,
  advanced: {
    cookiePrefix: process.env.AUTH_COOKIE_NAME!,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    nextCookies(),
    anonymous(),
    organization(),
    apiKey(),
    admin({
      ac,
      roles: {
        admin: adminRole,
        user: userRole,
        custom: customRole,
      },
    }),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        console.log(`Sending OTP ${code} to phone number ${phoneNumber}`);
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@my-site.com`;
        },
        getTempName: (phoneNumber) => {
          return phoneNumber;
        },
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ url, user }) => {
      await sendVerificationEmail({
        email: user.email,
        name: user.name,
        url,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
    },
  },
});
