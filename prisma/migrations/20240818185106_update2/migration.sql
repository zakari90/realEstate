/*
  Warnings:

  - You are about to drop the column `hasBalcony` on the `PropertyFeature` table. All the data in the column will be lost.
  - You are about to drop the column `hasGardenYard` on the `PropertyFeature` table. All the data in the column will be lost.
  - You are about to drop the column `hasSwimmingPool` on the `PropertyFeature` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PropertyFeature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "area" INTEGER,
    "parkingSpot" BOOLEAN,
    "swimmingPool" BOOLEAN,
    "gardenYard" BOOLEAN,
    "balcony" BOOLEAN
);
INSERT INTO "new_PropertyFeature" ("area", "bathrooms", "bedrooms", "id", "parkingSpot") SELECT "area", "bathrooms", "bedrooms", "id", "parkingSpot" FROM "PropertyFeature";
DROP TABLE "PropertyFeature";
ALTER TABLE "new_PropertyFeature" RENAME TO "PropertyFeature";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
