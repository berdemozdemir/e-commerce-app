CREATE TYPE "public"."payment_methods" AS ENUM('PayPal', 'Stripe', 'Cash on Delivery');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "payment_method" SET DATA TYPE "public"."payment_methods" USING "payment_method"::"public"."payment_methods";--> statement-breakpoint
ALTER TABLE "cart_items" ALTER COLUMN "product_id" SET NOT NULL;