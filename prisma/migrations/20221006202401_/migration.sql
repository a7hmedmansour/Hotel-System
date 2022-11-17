-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phonenum` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_phonenum_key`(`phonenum`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phonenum` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    UNIQUE INDEX `admin_phonenum_key`(`phonenum`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Description` VARCHAR(191) NOT NULL,
    `Daycost` DOUBLE NOT NULL,
    `Status` ENUM('Available', 'Reserved', 'Disabled') NOT NULL,
    `Type` ENUM('double', 'single') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservedrooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` VARCHAR(191) NOT NULL,
    `roomid` INTEGER NOT NULL,
    `adminid` INTEGER NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checkedoutrooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feedback` VARCHAR(191) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `userid` VARCHAR(191) NOT NULL,
    `roomid` INTEGER NOT NULL,
    `adminid` INTEGER NOT NULL,
    `startAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservedrooms` ADD CONSTRAINT `reservedrooms_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservedrooms` ADD CONSTRAINT `reservedrooms_adminid_fkey` FOREIGN KEY (`adminid`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservedrooms` ADD CONSTRAINT `reservedrooms_roomid_fkey` FOREIGN KEY (`roomid`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkedoutrooms` ADD CONSTRAINT `checkedoutrooms_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkedoutrooms` ADD CONSTRAINT `checkedoutrooms_adminid_fkey` FOREIGN KEY (`adminid`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkedoutrooms` ADD CONSTRAINT `checkedoutrooms_roomid_fkey` FOREIGN KEY (`roomid`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
