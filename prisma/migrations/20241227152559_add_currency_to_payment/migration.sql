/*
  Warnings:

  - Changed the type of `currency` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL;
