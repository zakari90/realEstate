-- CreateTable
CREATE TABLE "Agent" (
    "_id" TEXT NOT NULL,
    "clerkId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "InvestmentVisitLog" (
    "_id" TEXT NOT NULL,
    "location" TEXT,
    "investmentId" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestmentVisitLog_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "PropertyVisitLog" (
    "_id" TEXT NOT NULL,
    "location" TEXT,
    "propertyId" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyVisitLog_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN,
    "price" INTEGER,
    "contribution" INTEGER,
    "acceptedContributions" INTEGER,
    "numContributors" INTEGER,
    "location" TEXT,
    "purpose" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agentId" TEXT,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Property" (
    "_id" TEXT NOT NULL,
    "type" TEXT,
    "sellingBy" TEXT,
    "available" BOOLEAN,
    "numContributors" INTEGER,
    "address" TEXT,
    "mapUrl" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "area" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "agentId" TEXT,
    "ytVideo" TEXT,
    "video" TEXT,
    "panorama" TEXT,
    "images" TEXT,
    "features" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Client" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "PropertyOffer" (
    "_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "period" TEXT,
    "propertyId" TEXT,
    "clientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyOffer_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "InvestmentOffer" (
    "_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "clientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "investmentId" TEXT NOT NULL,
    "accepted" BOOLEAN DEFAULT false,

    CONSTRAINT "InvestmentOffer_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Visits" (
    "_id" TEXT NOT NULL,
    "totalVisits" INTEGER NOT NULL DEFAULT 0,
    "pagePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visits_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "WebVisitLog" (
    "_id" TEXT NOT NULL,
    "location" TEXT,
    "optionalData" TEXT,
    "visitsId" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebVisitLog_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "_id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "ip" TEXT,
    "location" TEXT,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clickData" TEXT,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_clerkId_key" ON "Agent"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyOffer_clientId_key" ON "PropertyOffer"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentOffer_clientId_key" ON "InvestmentOffer"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Visits_pagePath_key" ON "Visits"("pagePath");

-- AddForeignKey
ALTER TABLE "InvestmentVisitLog" ADD CONSTRAINT "InvestmentVisitLog_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyVisitLog" ADD CONSTRAINT "PropertyVisitLog_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyOffer" ADD CONSTRAINT "PropertyOffer_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyOffer" ADD CONSTRAINT "PropertyOffer_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentOffer" ADD CONSTRAINT "InvestmentOffer_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentOffer" ADD CONSTRAINT "InvestmentOffer_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebVisitLog" ADD CONSTRAINT "WebVisitLog_visitsId_fkey" FOREIGN KEY ("visitsId") REFERENCES "Visits"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
