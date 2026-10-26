import { MedusaContainer } from "@medusajs/framework";
import seedIdberry from "../scripts/seed-idberry";

/**
 * Runs once on the first `medusa db:migrate`.
 * IDBERRY: the Medusa demo data (Europe region, t-shirts…) has been replaced by
 * the IDBERRY Beauty store seed — see src/scripts/seed-idberry.ts.
 */
export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer;
}) {
  await seedIdberry({ container });
}
