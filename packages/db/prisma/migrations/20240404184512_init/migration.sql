-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "walletAddress" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "inventoryName" TEXT NOT NULL,
    "inventoryWebsiteUri" TEXT NOT NULL,
    "inventoryImageUri" TEXT,
    "inventoryDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" TEXT NOT NULL,
    "key" TEXT,
    "value" TEXT,
    "inventoryId" TEXT,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdSlot" (
    "id" TEXT NOT NULL,
    "slotName" TEXT NOT NULL,
    "slotDescription" TEXT,
    "slotLength" DOUBLE PRECISION,
    "slotWidth" DOUBLE PRECISION,
    "slotWebsiteUri" TEXT NOT NULL,
    "slotImageUri" TEXT,
    "slotType" TEXT NOT NULL,
    "slotPrice" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "slotPlatform" TEXT NOT NULL,
    "lent" BOOLEAN,
    "mintAddress" TEXT,
    "ownerAddress" TEXT,
    "ownerEmail" TEXT,
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
CREATE INDEX "Inventory_inventoryName_idx" ON "Inventory"("inventoryName");

-- CreateIndex
CREATE INDEX "Inventory_userId_idx" ON "Inventory"("userId");

-- CreateIndex
CREATE INDEX "Attributes_inventoryId_idx" ON "Attributes"("inventoryId");

-- CreateIndex
CREATE INDEX "AdSlot_inventoryId_idx" ON "AdSlot"("inventoryId");
