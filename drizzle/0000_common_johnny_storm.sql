CREATE TABLE IF NOT EXISTS "tasks" (
	"task_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL FOREIGN KEY REFERENCES users(email),
	"task" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"description" text,
	"is_complete" boolean DEFAULT false NOT NULL,
	"color" varchar(7) DEFAULT '#FFFFFF' NOT NULL
);
