import { pgTable, varchar, text, integer, timestamp, uniqueIndex, index } from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from "next-auth/adapters"

export const accounts = pgTable('accounts', {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),

  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: varchar('token_type', { length: 191 }),
  idToken: text('id_token'),
  sessionState: varchar('session_state', { length: 191 }),
  createdAt: timestamp('created_at', { precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { precision: 3 }).defaultNow().notNull(),
}, (table) => ({
  idxUserId: index('idx_accounts_userId').on(table.userId),
  ukProviderProviderAccountId: uniqueIndex('uk_accounts_p_p').on(table.provider, table.providerAccountId),
}));

export const sessions = pgTable('sessions', {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (table) => ({
  idxUserId: index('idx_sessions_userId').on(table.userId),
}));

export const users = pgTable('users', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  role: text("role"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp('created_at', { precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { precision: 3 }).defaultNow().notNull(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 191 }).unique(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 191 }).unique(),
  stripePriceId: varchar('stripe_price_id', { length: 191 }),
  stripeCurrentPeriodEnd: timestamp('stripe_current_period_end', { precision: 3 }),
});

export const verificationTokens = pgTable('verification_tokens', {
  identifier: varchar('identifier', { length: 191 }).notNull(),
  token: varchar('token', { length: 191 }).notNull().unique(),
  expires: timestamp('expires', { precision: 3 }).notNull(),
}, (table) => ({
  identifierToken: uniqueIndex('uk_verification_tokens_identifier_token_key').on(table.identifier, table.token),
}));