ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_pkey";--> statement-breakpoint
ALTER TABLE "cart_items" ALTER COLUMN "carts_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_carts_id_product_id_pk" PRIMARY KEY("carts_id","product_id");--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN "id";
