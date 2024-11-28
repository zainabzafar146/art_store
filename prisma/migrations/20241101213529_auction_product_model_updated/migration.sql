/*
  Warnings:

  - You are about to drop the column `CurrentBid` on the `AuctionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `SoldoutBid` on the `AuctionProduct` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AuctionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuctionProduct" DROP COLUMN "CurrentBid",
DROP COLUMN "SoldoutBid",
ADD COLUMN     "currentBid" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "soldOutBid" DOUBLE PRECISION,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AuctionProduct" ADD CONSTRAINT "AuctionProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
