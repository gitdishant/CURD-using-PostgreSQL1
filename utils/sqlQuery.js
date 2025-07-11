
//CREATE TYPE role_queary AS
//ENUM('DEVELOPER','HR','MANEGER','SALES','INTERN');

export const createRoleTypeSafely = `
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'role_queary'
    ) THEN
        CREATE TYPE role_queary AS ENUM('DEVELOPER', 'HR', 'MANEGER', 'SALES', 'INTERN');
    END IF;
END$$;
`;

export const createEmployeesTable = `
CREATE TABLE IF NOT EXISTS employee_details (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    age SMALLINT NOT NULL CHECK (age > 17),
    role role_queary NOT NULL DEFAULT 'INTERN',
    salary DECIMAL(6,2) NOT NULL
);
`;

export const allDetailsQuery = `SELECT * FROM employee_details;`;
