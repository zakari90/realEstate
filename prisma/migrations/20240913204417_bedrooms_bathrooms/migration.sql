/*
  Warnings:

  - You are about to drop the column `imageUrls` on the `Property` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT,
    "status" TEXT,
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
INSERT INTO "new_Property" ("address", "agentId", "area", "bathrooms", "bedrooms", "createdAt", "description", "features", "id", "mapUrl", "panorama", "price", "status", "type", "updatedAt", "video") SELECT "address", "agentId", "area", "bathrooms", "bedrooms", "createdAt", "description", "features", "id", "mapUrl", "panorama", "price", "status", "type", "updatedAt", "video" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
