-- Single reusable function: set updated_at to now() on row update.
-- Each table with updated_at gets one trigger that calls this function.
-- New tables: run `bun run drizzle:migrate` (or `drizzle:sync-triggers`); sync script adds triggers automatically.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "user"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
--> statement-breakpoint
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "account"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
--> statement-breakpoint
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "session"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
--> statement-breakpoint
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "orders"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
--> statement-breakpoint
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "order_items"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
--> statement-breakpoint
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "carts"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
--> statement-breakpoint
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "cart_items"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
--> statement-breakpoint
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "ratings"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
