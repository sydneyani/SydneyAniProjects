# Hospital database

## Problem

Build a hospital database and answer operational questions against it: unpaid balances, nurse workload, lab turnaround, recent surgeries without a follow-up, and audit events outside a user’s permissions.

## Data

`hospital-schema.sql` is a MySQL script. It creates `HospitalDB` and tables for clinical care (patients, doctors, nurses, appointments, surgeries, allergies, medications, lab tests, telehealth), facilities (rooms, beds, equipment), billing (billing, payments, insurance), supply chain (suppliers, inventory, shipments, orders), and access (`Users`, `AuditTrail`), plus several relationship tables. The same file inserts sample rows for those tables. No query result set is saved in the repo.

`retrieve-active-users.sql` is a separate one-statement example (`name`, `email` from `users` where `active = 1`). It does not reference the hospital tables.

## Method

DDL, sample `INSERT`s, then `SELECT`s using joins, `GROUP BY`, `HAVING`, date filters (`DATE_SUB`, `CURRENT_DATE`), and `FIND_IN_SET` for the audit check. Examples include remaining balance (`BILL_AMOUNT - AMOUNT_PAID`), nurses in selected departments with `Hours_Worked > 40`, lab techs with more than 20 tests and average turnaround above 48 hours, and doctors with more than one surgery in the current year.

## Results

The script does not store executed output, so there are no row counts or timings to report.
