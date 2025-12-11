ALTER TABLE "experts" DROP CONSTRAINT "experts_category_id_categories_category_id_fk";
--> statement-breakpoint
ALTER TABLE "queries" DROP CONSTRAINT "queries_category_id_categories_category_id_fk";
--> statement-breakpoint
ALTER TABLE "experts" ADD CONSTRAINT "experts_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queries" ADD CONSTRAINT "queries_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE cascade ON UPDATE no action;