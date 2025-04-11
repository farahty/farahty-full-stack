import { createAuthClient } from "better-auth/react";
import {
  anonymousClient,
  adminClient,
  phoneNumberClient,
  apiKeyClient,
  organizationClient,
} from "better-auth/client/plugins";
import { ac, adminRole, customRole, userRole } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    apiKeyClient(),
    anonymousClient(),
    organizationClient(),
    adminClient({
      ac,
      roles: {
        admin: adminRole,
        user: userRole,
        custom: customRole,
      },
    }),
    phoneNumberClient(),
  ],
});
