/*
  Warnings:

  - You are about to drop the column `city` on the `Property` table. All the data in the column will be lost.

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
    "agentId" TEXT,
    "video" TEXT,
    "panorama" TEXT,
    "imageUrls" TEXT,
    "features" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agents" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("address", "agentId", "area", "createdAt", "description", "features", "id", "imageUrls", "mapUrl", "panorama", "price", "status", "type", "updatedAt", "video") SELECT "address", "agentId", "area", "createdAt", "description", "features", "id", "imageUrls", "mapUrl", "panorama", "price", "status", "type", "updatedAt", "video" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
