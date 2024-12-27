/*
  Warnings:

  - Added the required column `currency` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "currency" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "currency" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "currency" TEXT NOT NULL;
