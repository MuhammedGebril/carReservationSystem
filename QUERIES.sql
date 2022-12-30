-- All reservations within specified period including all car and customer information
-- from {start} to {end}
SELECT * FROM `reserve`
NATURAL JOIN `car`
NATURAL JOIN `customer`
WHERE s_date >= {start} AND s_date <= {end};

-- All reservations of any car within a specified period including all car information
-- {plate} {start} {end}
SELECT * FROM `reserve`
NATURAL JOIN `car`
WHERE plate_id = {plate} AND s_date >= {start} AND s_date <= {end};

-- The status of all cars on a specific day
-- {date}
SELECT A.date, A.recent_status, A.plate_id FROM `car_status` AS A
WHERE (A.date, A.plate_id) IN (
SELECT MAX(B.`date`), B.plate_id FROM `car_status` AS B
    WHERE B.`date` < {date}
    GROUP BY B.plate_id
);

-- All reservations of specific customer including customer information, car model and plate id
-- {ssn}
SELECT ssn, email, name, password, ph_num, age, gender, model, plate_id FROM `reserve`
NATURAL JOIN `customer`
NATURAL JOIN `car`
WHERE ssn = {ssn};

-- Daily payments within specific period
-- {start} {end}
SELECT SUM(d_price * DATEDIFF(d_date,s_date)) FROM `payment`
NATURAL JOIN `reserve`
NATURAL JOIN `car`
WHERE payment.date >= {start} AND payment.date <= {end}
GROUP BY payment.R_id;
