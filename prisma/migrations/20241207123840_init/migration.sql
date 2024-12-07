-- AlterTable
ALTER TABLE "_CarrierToZone" ADD CONSTRAINT "_CarrierToZone_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CarrierToZone_AB_unique";
