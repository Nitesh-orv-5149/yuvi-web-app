CREATE TABLE "admin" (
	"admin_id" varchar(50) PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "answers" (
	"answer_id" varchar(50) PRIMARY KEY NOT NULL,
	"query_id" varchar(50) NOT NULL,
	"expert_id" varchar(50) NOT NULL,
	"answer_body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"category_id" varchar(50) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"client_id" varchar(50) PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"phone_number" varchar(12) NOT NULL,
	CONSTRAINT "clients_username_unique" UNIQUE("username"),
	CONSTRAINT "clients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"conversation_id" varchar(50) PRIMARY KEY NOT NULL,
	"client_id" varchar(50) NOT NULL,
	"expert_id" varchar(50) NOT NULL,
	"last_message_id" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "conversations_client_id_expert_id_unique" UNIQUE("client_id","expert_id")
);
--> statement-breakpoint
CREATE TABLE "experts" (
	"expert_id" varchar(50) PRIMARY KEY NOT NULL,
	"expert_username" text NOT NULL,
	"expert_email" text NOT NULL,
	"expert_password" text NOT NULL,
	"phone_number" varchar(12) NOT NULL,
	"category_id" varchar NOT NULL,
	"bio" text,
	"is_approved" boolean DEFAULT false NOT NULL,
	"queries_answered" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "experts_expert_username_unique" UNIQUE("expert_username"),
	CONSTRAINT "experts_expert_email_unique" UNIQUE("expert_email")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"message_id" varchar(50) PRIMARY KEY NOT NULL,
	"conversation_id" varchar(50) NOT NULL,
	"sender_role" text NOT NULL,
	"sender_id" varchar(50) NOT NULL,
	"content" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "queries" (
	"query_id" varchar(50) PRIMARY KEY NOT NULL,
	"question_title" text NOT NULL,
	"question_body" text NOT NULL,
	"client_id" varchar(50) NOT NULL,
	"category_id" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_query_id_queries_query_id_fk" FOREIGN KEY ("query_id") REFERENCES "public"."queries"("query_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_expert_id_experts_expert_id_fk" FOREIGN KEY ("expert_id") REFERENCES "public"."experts"("expert_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_client_id_clients_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("client_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_expert_id_experts_expert_id_fk" FOREIGN KEY ("expert_id") REFERENCES "public"."experts"("expert_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_last_message_id_messages_message_id_fk" FOREIGN KEY ("last_message_id") REFERENCES "public"."messages"("message_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experts" ADD CONSTRAINT "experts_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("conversation_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queries" ADD CONSTRAINT "queries_client_id_clients_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("client_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queries" ADD CONSTRAINT "queries_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;