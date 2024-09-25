git commit -m "commit"
-- CreateTable
CREATE TABLE "Agents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clerkId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT,
    "state" TEXT,
    "status" BOOLEAN,
    "address" TEXT,
    "mapUrl" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "area" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "agentId" TEXT,
    "video" TEXT,
    "panorama" TEXT,
    "images" TEXT,
    "features" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agents" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "period" TEXT NOT NULL,
    "propertyId" TEXT,
    "clientId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Offer_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offer_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Agents_clerkId_key" ON "Agents"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Agents_email_key" ON "Agents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_clientId_key" ON "Offer"("clientId");
