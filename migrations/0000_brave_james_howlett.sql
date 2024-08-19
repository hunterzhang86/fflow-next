CREATE TABLE IF NOT EXISTS "accounts" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"type" varchar(191) NOT NULL,
	"provider" varchar(191) NOT NULL,
	"providerAccountId" varchar(191) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(191),
	"scope" varchar(191),
	"id_token" text,
	"session_state" varchar(191),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"sessionToken" varchar(191) NOT NULL,
	"userId" varchar(191) NOT NULL,
	"expires" timestamp (3) NOT NULL,
	CONSTRAINT "sessions_sessionToken_unique" UNIQUE("sessionToken")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(191),
	"email" varchar(191),
	"emailVerified" timestamp (3),
	"image" varchar(191),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"stripe_customer_id" varchar(191),
	"stripe_subscription_id" varchar(191),
	"stripe_price_id" varchar(191),
	"stripe_current_period_end" timestamp (3),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "users_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"identifier" varchar(191) NOT NULL,
	"token" varchar(191) NOT NULL,
	"expires" timestamp (3) NOT NULL,
	CONSTRAINT "verification_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_accounts_userId" ON "accounts" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uk_accounts_p_p" ON "accounts" USING btree ("provider","providerAccountId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_sessions_userId" ON "sessions" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uk_verification_tokens_identifier_token_key" ON "verification_tokens" USING btree ("identifier","token");