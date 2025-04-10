USE hhn_db;
SHOW TABLES;
SELECT * FROM hhn_db.hhn_persons;
SELECT * FROM hhn_db.hhn_houses;
SELECT * FROM hhn_db.hhn_houses_by_person

DELIMITER $$

DROP PROCEDURE IF EXISTS update_house_visits;
CREATE PROCEDURE update_house_visits (
    IN p_person_id INT,
    IN p_house_id INT,
    IN p_visit_count INT
)
BEGIN
    INSERT INTO houses_by_persons (house_id, person_id, visit_count)
    VALUES (p_house_id, p_person_id, p_visit_count)
    ON DUPLICATE KEY UPDATE
        visit_count = visit_count + p_visit_count; 
END$$

DELIMITER ;

ALTER TABLE hhn_houses_by_person
ADD UNIQUE KEY unique_house_person (house_id, person_id);
