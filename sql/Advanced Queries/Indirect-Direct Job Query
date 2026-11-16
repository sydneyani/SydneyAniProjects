WITH ranked_individuals AS (
    SELECT 
        names_table.person_id,
        people_table.person_number,
        names_table.first_name, 
        names_table.last_name,
        assignments_table.ass_attribute3,
        ROW_NUMBER() OVER (PARTITION BY people_table.person_number ORDER BY names_table.person_id) AS rn
    FROM 
        names_table
    LEFT JOIN 
        licenses_table
    ON 
        names_table.person_id = licenses_table.person_id
    JOIN 
        people_table
    ON 
        names_table.person_id = people_table.person_id
    JOIN
        assignments_table
    ON
        names_table.person_id = assignments_table.person_id
)
SELECT 
    person_id,
    person_number,
    first_name, 
    last_name,
    ass_attribute3
FROM 
    ranked_individuals
WHERE 
    rn = 1;
