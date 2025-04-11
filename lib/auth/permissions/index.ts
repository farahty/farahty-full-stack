import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  project: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const userRole = ac.newRole({
  project: ["create"],
});

export const adminRole = ac.newRole({
  ...adminAc.statements,
  project: ["create", "update"],
});

export const customRole = ac.newRole({
  project: ["create", "update", "delete"],
});
