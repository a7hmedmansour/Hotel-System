-- AlterTable
ALTER TABLE `checkedoutrooms` ALTER COLUMN `startAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `reservedrooms` ALTER COLUMN `endAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `tokenaccess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valid` BOOLEAN NOT NULL DEFAULT true,
    `adminid` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tokenaccess` ADD CONSTRAINT `tokenaccess_adminid_fkey` FOREIGN KEY (`adminid`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
