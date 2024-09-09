CREATE TABLE IF NOT EXISTS "quotas" (
	"id" text PRIMARY KEY NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"type" text NOT NULL,
	"total_quota" integer NOT NULL,
	"used_quota" integer NOT NULL,
	"remaining_quota" integer NOT NULL
);
