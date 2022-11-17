-- AlterTable
ALTER TABLE `admin` ADD COLUMN `role` ENUM('master', 'admin') NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE `checkedoutrooms` ALTER COLUMN `startAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `reservedrooms` ALTER COLUMN `endAt` DROP DEFAULT;
