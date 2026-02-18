ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'User'::"public"."role";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "image";