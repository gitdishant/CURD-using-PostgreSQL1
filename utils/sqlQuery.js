
//CREATE TYPE role_queary AS
//ENUM('DEVELOPER','HR','MANEGER','SALES','INTERN');

export const createRoleTypeSafely = `
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'role_queary'
    ) THEN
        CREATE TYPE role_queary AS ENUM('DEVELOPER', 'HR', 'MANAGER', 'SALES', 'INTERN');
    END IF;
END$$;
`;

export const createEmployeesTable = `
CREATE TABLE IF NOT EXISTS employee_details (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL ,
    email VARCHAR(50) NOT NULL,
    age SMALLINT NOT NULL CHECK (age > 17) ,
    role role_queary NOT NULL DEFAULT 'INTERN',
    salary DECIMAL(6,2) NOT NULL
);
`;

export const allDetailsQuery = `SELECT * FROM employee_details;`;

export const createEmployeesQuery = `
INSERT INTO employee_details(name, email, age, role, salary)
VALUES ($1, $2, $3, COALESCE($4::role_queary, 'INTERN'::role_queary),$5) 
RETURNING *;
`;

export const getEmployeesQuery = `
SELECT * FROM  employee_details WHERE id = $1;
`;


export const deleteEmployeesQuery = `
DELETE FROM  employee_details WHERE id = $1;
`;

export const updateEmployeesQuery = `
UPDATE employee_details 
SET
name = COALESCE($1,name),
email = COALESCE($2,email),
age = COALESCE($3,age),
role = COALESCE($4 :: role_queary,role),
salary = COALESCE($5,salary)
WHERE id = $6
RETURNING * ;

`