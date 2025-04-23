CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"images" text[] NOT NULL,
	"brand" text NOT NULL,
	"description" text NOT NULL,
	"stock" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"rating" numeric(3, 2) DEFAULT '0',
	"num_reviews" integer DEFAULT 0,
	"is_featured" boolean DEFAULT false,
	"banner" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
