-- CreateTable
CREATE TABLE `Staff` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` CHAR(36) NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Device` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `stok` INTEGER NOT NULL DEFAULT 0,
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` CHAR(36) NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` CHAR(36) NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` CHAR(36) NOT NULL,
    `id_staff` CHAR(36) NOT NULL,
    `id_category` CHAR(36) NOT NULL,
    `departure_date` DATE NOT NULL,
    `time_out` VARCHAR(10) NOT NULL,
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` CHAR(36) NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailTransaction` (
    `id` CHAR(36) NOT NULL,
    `id_transaction` CHAR(36) NOT NULL,
    `id_device` CHAR(36) NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 1,

    INDEX `DetailTransaction_id_transaction_idx`(`id_transaction`),
    INDEX `DetailTransaction_id_device_idx`(`id_device`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_id_staff_fkey` FOREIGN KEY (`id_staff`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTransaction` ADD CONSTRAINT `DetailTransaction_id_transaction_fkey` FOREIGN KEY (`id_transaction`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTransaction` ADD CONSTRAINT `DetailTransaction_id_device_fkey` FOREIGN KEY (`id_device`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
