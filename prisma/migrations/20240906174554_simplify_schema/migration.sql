/*
  Warnings:

  - You are about to drop the `PropertyFeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PropertyFeature";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PropertyImage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PropertyLocation";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT,
    "status" TEXT,
    "address" TEXT,
    "city" TEXT,
    "mapUrl" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "agentId" TEXT,
    "locationId" TEXT,
    "featureId" TEXT,
    "video" TEXT,
    "panorama" TEXT,
    "imageUrls" TEXT,
    "features" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agents" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("agentId", "createdAt", "description", "featureId", "id", "locationId", "panorama", "price", "status", "type", "updatedAt", "video") SELECT "agentId", "createdAt", "description", "featureId", "id", "locationId", "panorama", "price", "status", "type", "updatedAt", "video" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE UNIQUE INDEX "Property_locationId_key" ON "Property"("locationId");
CREATE UNIQUE INDEX "Property_featureId_key" ON "Property"("featureId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
