-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "underdogProjectId" INTEGER NOT NULL,
    "collectionMintAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdNft" (
    "id" TEXT NOT NULL,
    "underdogNftId" INTEGER NOT NULL,
    "nftMintAddress" TEXT NOT NULL,
    "nftDisplayUri" TEXT NOT NULL,
    "nftRedirectUri" TEXT NOT NULL,
    "nftFileType" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdNft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "inventoryName" TEXT NOT NULL,
    "inventoryWebsiteUri" TEXT NOT NULL,
    "inventoryImageUri" TEXT NOT NULL,
    "inventoryDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdSlot" (
    "id" TEXT NOT NULL,
    "slotName" TEXT NOT NULL,
    "slotDescription" TEXT NOT NULL,
    "slotLength" DOUBLE PRECISION NOT NULL,
    "slotWidth" DOUBLE PRECISION NOT NULL,
    "slotWebsiteUri" TEXT NOT NULL,
    "slotImageUri" TEXT NOT NULL,
    "slotType" TEXT NOT NULL,
    "slotPrice" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "slotPlatform" TEXT NOT NULL,
    "lent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventoryId" TEXT NOT NULL,

    CONSTRAINT "AdSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE INDEX "Project_userId_idx" ON "Project"("userId");

-- CreateIndex
CREATE INDEX "Project_inventoryId_idx" ON "Project"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "AdNft_projectId_key" ON "AdNft"("projectId");

-- CreateIndex
CREATE INDEX "Inventory_inventoryName_idx" ON "Inventory"("inventoryName");

-- CreateIndex
CREATE INDEX "Inventory_userId_idx" ON "Inventory"("userId");

-- CreateIndex
CREATE INDEX "Attributes_inventoryId_idx" ON "Attributes"("inventoryId");

-- CreateIndex
CREATE INDEX "AdSlot_inventoryId_idx" ON "AdSlot"("inventoryId");
