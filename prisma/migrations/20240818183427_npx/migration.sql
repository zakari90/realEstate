/*
  Warnings:

  - You are about to drop the column `region` on the `PropertyLocation` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `PropertyLocation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PropertyLocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "streetAddress" TEXT,
    "city" TEXT,
    "zip" TEXT,
    "landmark" TEXT
);
INSERT INTO "new_PropertyLocation" ("city", "id", "landmark", "streetAddress", "zip") SELECT "city", "id", "landmark", "streetAddress", "zip" FROM "PropertyLocation";
DROP TABLE "PropertyLocation";
ALTER TABLE "new_PropertyLocation" RENAME TO "PropertyLocation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
