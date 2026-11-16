# Workforce queries

## Problem

Three read-only queries over an effective-dated HR model: who sits in a department, a deduplicated person list with an assignment attribute, and a five-level manager chain.

## Data

No sample database is included. The scripts assume Oracle-style tables (`SYSDATE`, `TRUNC`, string concatenation with `||`) such as `People`, `Person_Names`, `Assignments`, `Departments`, `Org_Units`, `Locations`, and `EMP_MANAGER_HIERARCHY`. Nothing here was executed in the repo, so no result grid is available.

## Method

- `department-roster.sql` keeps the latest effective department attributes with `ROW_NUMBER`, counts people per department, and returns people in US locations whose department count is 1.
- `direct-and-indirect-assignments.sql` joins names, people, licenses, and assignments, then keeps one row per `person_number`.
- `manager-hierarchy.sql` takes the latest manager-hierarchy row per employee and joins five manager levels, limited to current global names and active employee assignments.

## Results

No query output is stored. The files are the queries only.
