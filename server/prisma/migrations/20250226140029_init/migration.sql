/*
  Warnings:

  - You are about to drop the column `sellingDate` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sellingDate",
ADD COLUMN     "purchaseDate" TIMESTAMP(3);
