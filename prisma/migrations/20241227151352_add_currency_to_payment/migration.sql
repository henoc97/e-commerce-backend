/*
  Warnings:

  - Changed the type of `currency` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currency` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL;
