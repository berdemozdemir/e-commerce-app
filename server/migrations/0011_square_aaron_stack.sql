CREATE TYPE "public"."role" AS ENUM('User', 'Admin');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;