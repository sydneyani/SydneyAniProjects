# SQL

Two kinds of SQL sit in this folder. Neither file includes a captured query result, so there are no metrics to report.

## Hospital database

[`hospital-database.sql`](hospital-database.sql) creates `HospitalDB` and tables for departments, doctors, nurses, patients, appointments, insurance, billing, pharmacy, inventory, surgeries, lab tests, telehealth, users, and an audit trail. It inserts sample rows, then poses twelve questions: patients who saw more than one doctor in the past month, equipment used more than five times this year, large out-of-pocket balances, October surgery counts, medications with quantity under 10 and no order, doctors in more than one department, prescriptions that match a medium or high allergy, unpaid bill remainders, nurses over 40 hours in selected departments, lab techs with more than 20 tests and average turnaround over 48 hours, recent surgeries with no future appointment, and audit actions outside a user's permissions.

[`retrieve-active-users.sql`](retrieve-active-users.sql) is a single select of `name` and `email` from `users` where `active = 1`, ordered by name.

## Workforce queries

These scripts use Oracle-style effective dating (`TRUNC(SYSDATE)` between start and end dates) and `ROW_NUMBER`.

| Script | What it does |
| --- | --- |
| [`advanced/departments.sql`](advanced/departments.sql) | Latest attributes and active departments (`status = 'A'`), then people and assignment numbers joined to a department name and location. |
| [`advanced/manager-hierarchy.sql`](advanced/manager-hierarchy.sql) | Latest `EMP_MANAGER_HIERARCHY` row per employee, then names for the employee and five manager levels. Keeps active employee assignments (`ASSIGN_STATUS_TYPE = 'ACTIVE'`, `ASSIGN_TYPE = 'E'`). |
| [`advanced/ranked-person-assignments.sql`](advanced/ranked-person-assignments.sql) | Joins names, people, and assignments, numbers rows per `person_number`, and keeps `rn = 1`, including `ass_attribute3`. |

The original filename for the third script was "Indirect-Direct Job Query". The statement itself does not filter direct versus indirect jobs. It returns one ranked row per person number.
