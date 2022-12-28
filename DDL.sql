CREATE TABLE `car`(
    `plate_id` VARCHAR(255) NOT NULL,
    `make` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `year` YEAR NOT NULL,
    `color` VARCHAR(255) NOT NULL,
    `milage` INT UNSIGNED NOT NULL DEFAULT 1,
    `d_price` DECIMAL(8, 2) NOT NULL,
    `hp` INT UNSIGNED NOT NULL,
    `off_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `car` ADD PRIMARY KEY `car_plate_id_primary`(`plate_id`);
CREATE TABLE `reserve`(
    `plate_id` VARCHAR(255) NOT NULL,
    `s_date` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `d_date` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `ssn` VARCHAR(255) NOT NULL,
    `R_id` INT UNSIGNED NOT NULL,
    `cancelled` TINYINT(1) NOT NULL
);
ALTER TABLE
    `reserve` ADD PRIMARY KEY `reserve_plate_id_s_date_ssn_primary`(`plate_id`,`s_date`,`ssn`);
ALTER TABLE
    `reserve` ADD UNIQUE `reserve_r_id_unique`(`R_id`);
CREATE TABLE `office`(
    `off_id` INT UNSIGNED NOT NULL,
    `ph_num` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `office` ADD PRIMARY KEY `office_off_id_primary`(`off_id`);
ALTER TABLE
    `office` ADD UNIQUE `office_ph_num_unique`(`ph_num`);
CREATE TABLE `pickup`(
    `R_id` INT UNSIGNED NOT NULL,
    `date` TIMESTAMP NOT NULL DEFAULT current_timestamp
);
ALTER TABLE
    `pickup` ADD PRIMARY KEY `pickup_r_id_primary`(`R_id`);
CREATE TABLE `customer`(
    `ssn` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `ph_num` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `age` INT UNSIGNED NOT NULL,
    `gender` CHAR(255) NOT NULL
);
ALTER TABLE
    `customer` ADD PRIMARY KEY `customer_ssn_primary`(`ssn`);
ALTER TABLE
    `customer` ADD UNIQUE `customer_email_unique`(`email`);
CREATE TABLE `car_status`(
    `plate_id` VARCHAR(255) NOT NULL,
    `date` TIMESTAMP NOT NULL DEFAULT current_timestamp,
    `recent_status` VARCHAR(255) NOT NULL DEFAULT 'active'
);
ALTER TABLE
    `car_status` ADD PRIMARY KEY `car_status_plate_id_date_primary`(`plate_id`, `date`);
ALTER TABLE
    `car` ADD CONSTRAINT `car_off_id_foreign` FOREIGN KEY(`off_id`) REFERENCES `office`(`off_id`);
ALTER TABLE
    `reserve` ADD CONSTRAINT `reserve_plate_id_foreign` FOREIGN KEY(`plate_id`) REFERENCES `car`(`plate_id`);
ALTER TABLE
    `reserve` ADD CONSTRAINT `reserve_ssn_foreign` FOREIGN KEY(`ssn`) REFERENCES `customer`(`ssn`);
ALTER TABLE
    `car_status` ADD CONSTRAINT `car_status_plate_id_foreign` FOREIGN KEY(`plate_id`) REFERENCES `car`(`plate_id`);
ALTER TABLE
    `pickup` ADD CONSTRAINT `pickup_r_id_foreign` FOREIGN KEY(`R_id`) REFERENCES `reserve`(`R_id`);
