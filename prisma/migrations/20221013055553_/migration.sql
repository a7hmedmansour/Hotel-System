/*
  Warnings:

  - You are about to drop the column `valid` on the `tokenaccess` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `checkedoutrooms` ALTER COLUMN `startAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `reservedrooms` ALTER COLUMN `endAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tokenaccess` DROP COLUMN `valid`;
