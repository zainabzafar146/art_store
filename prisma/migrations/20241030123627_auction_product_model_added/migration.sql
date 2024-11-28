-- CreateTable
CREATE TABLE "AuctionProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "vendor" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "startingBid" DOUBLE PRECISION NOT NULL,
    "CurrentBid" DOUBLE PRECISION NOT NULL,
    "SoldoutBid" DOUBLE PRECISION NOT NULL,
    "auctionStatus" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuctionProduct_pkey" PRIMARY KEY ("id")
);
