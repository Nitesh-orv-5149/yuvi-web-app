ALTER TABLE "categories" DROP CONSTRAINT "categories_name_unique";--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "category_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "category_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "desc" text;