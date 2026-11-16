WITH LatestAttributes AS (
    SELECT
        org_units.organization_id,
        org_units.business_group_id,
        org_units.Attribute4,
        org_units.Attribute5,
        org_units.Attribute6,
        org_units.Attribute7,
        org_units.last_update_date,
        org_units.location_id,
        ROW_NUMBER() OVER (PARTITION BY org_units.organization_id ORDER BY org_units.last_update_date DESC) AS attr_rn
    FROM
        Org_Units org_units
    WHERE
        TRUNC(SYSDATE) BETWEEN org_units.EFFECTIVE_START_DATE AND org_units.EFFECTIVE_END_DATE
),
LatestDepartments AS (
    SELECT 
        depts.organization_id,
        depts.business_group_id,
        depts.Name AS department_name,
        la.Attribute4,
        la.Attribute5,
        la.Attribute6,
        la.Attribute7,
        la.location_id,
        la.last_update_date,
        ROW_NUMBER() OVER (PARTITION BY depts.organization_id ORDER BY depts.last_update_date DESC) AS dept_rn
    FROM 
        Departments depts
    JOIN 
        LatestAttributes la ON la.organization_id = depts.organization_id
    WHERE 
        depts.status = 'A'
        AND TRUNC(SYSDATE) BETWEEN depts.EFFECTIVE_START_DATE AND depts.EFFECTIVE_END_DATE
        AND la.attr_rn = 1
),
LatestDepartmentAssignments AS (
    SELECT
        person_names.person_id,
        people.business_group_id,
        assignments.assignment_number,
        LatestDepartments.department_name,
        locations.location_name,
        ROW_NUMBER() OVER (PARTITION BY assignments.organization_id 
                           ORDER BY LatestDepartments.last_update_date DESC) AS rn
    FROM 
        Person_Names person_names
    JOIN 
        People people ON person_names.person_id = people.person_id
    JOIN 
        Assignments assignments ON people.person_id = assignments.person_id
    JOIN 
        Assignments_Mapping assignments_map ON assignments.assignment_number = assignments_map.assignment_number
    JOIN 
        LatestDepartments ON assignments_map.organization_id = LatestDepartments.organization_id
    JOIN 
        Organization_Units org_units ON LatestDepartments.organization_id = org_units.organization_id
    JOIN 
        Locations locations ON LatestDepartments.location_id = locations.location_id
    WHERE 
        TRUNC(SYSDATE) BETWEEN people.EFFECTIVE_START_DATE AND people.EFFECTIVE_END_DATE
        AND TRUNC(SYSDATE) BETWEEN person_names.EFFECTIVE_START_DATE AND person_names.EFFECTIVE_END_DATE
        AND person_names.NAME_TYPE = 'GLOBAL'
        AND TRUNC(SYSDATE) BETWEEN assignments_map.EFFECTIVE_START_DATE AND assignments_map.EFFECTIVE_END_DATE
        AND assignments_map.ASSIGNMENT_STATUS_TYPE IN ('ACTIVE')
        AND assignments_map.ASSIGNMENT_TYPE = 'E'
        AND assignments_map.EFFECTIVE_LATEST_CHANGE = 'Y'
        AND assignments_map.PRIMARY_FLAG = 'Y'
        AND LatestDepartments.business_group_id = people.business_group_id
),
DepartmentCounts AS (
    SELECT
        department_name,
        COUNT(person_names.person_id) AS department_count
    FROM
        LatestDepartmentAssignments
    JOIN 
        Person_Names person_names ON LatestDepartmentAssignments.person_id = person_names.person_id
    GROUP BY
        department_name
),
FilteredDepartments AS (
    SELECT
        LatestDepartmentAssignments.*
    FROM
        LatestDepartmentAssignments
    JOIN 
        DepartmentCounts ON LatestDepartmentAssignments.department_name = DepartmentCounts.department_name
    WHERE
        DepartmentCounts.department_count = 1
)
SELECT DISTINCT
    people.person_number,
    person_names.first_name,
    person_names.last_name,
    LDA.assignment_number,
    LDA.department_name,
    LDA.location_name
FROM
    FilteredDepartments LDA
JOIN 
    Person_Names person_names ON LDA.person_id = person_names.person_id
JOIN 
    People people ON person_names.person_id = people.person_id
WHERE
    LDA.rn = 1
    AND (people.effective_end_date IS NULL OR people.effective_end_date LIKE '%4712%')
    AND LDA.location_name LIKE 'US%'
ORDER BY 
    people.person_number;
