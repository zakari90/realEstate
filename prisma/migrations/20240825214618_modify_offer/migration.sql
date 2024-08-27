/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Offer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Offer_clientId_key" ON "Offer"("clientId");
