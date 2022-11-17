-- AlterTable
ALTER TABLE `checkedoutrooms` ALTER COLUMN `startAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `reservedrooms` ALTER COLUMN `endAt` DROP DEFAULT;
