-- DropForeignKey
ALTER TABLE "AuctionProduct" DROP CONSTRAINT "AuctionProduct_userId_fkey";

-- AlterTable
ALTER TABLE "AuctionProduct" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AuctionProduct" ADD CONSTRAINT "AuctionProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
