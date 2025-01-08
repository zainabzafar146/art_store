-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "artistUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_artistUserId_fkey" FOREIGN KEY ("artistUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
