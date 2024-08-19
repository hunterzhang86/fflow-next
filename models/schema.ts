import { pgTable, varchar, text, integer, timestamp, uniqueIndex, index } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  userId: varchar('userId', { length: 191 }).notNull(),
  type: varchar('type', { length: 191 }).notNull(),
  provider: varchar('provider', { length: 191 }).notNull(),
  providerAccountId: varchar('providerAccountId', { length: 191 }).notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: varchar('token_type', { length: 191 }),
  scope: varchar('scope', { length: 191 }),
  idToken: text('id_token'),
  sessionState: varchar('session_state', { length: 191 }),
  createdAt: timestamp('created_at', { precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { precision: 3 }).defaultNow().notNull(),
}, (table) => ({
  idxUserId: index('idx_accounts_userId').on(table.userId),
  ukProviderProviderAccountId: uniqueIndex('uk_accounts_p_p').on(table.provider, table.providerAccountId),
}));

export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  sessionToken: varchar('sessionToken', { length: 191 }).notNull().unique(),
  userId: varchar('userId', { length: 191 }).notNull(),
  expires: timestamp('expires', { precision: 3 }).notNull(),
}, (table) => ({
  idxUserId: index('idx_sessions_userId').on(table.userId),
}));

export const users = pgTable('users', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  name: varchar('name', { length: 191 }),
  email: varchar('email', { length: 191 }).unique(),
  emailVerified: timestamp('emailVerified', { precision: 3 }),
  image: varchar('image', { length: 191 }),
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