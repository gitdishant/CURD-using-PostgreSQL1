import { query } from "../utils/connectToDB.js";
import { createRoleTypeSafely, createEmployeesTable,allDetailsQuery } from "../utils/sqlQuery.js";
/*export async function getAllEmployees(req, res, next) {
    try{
        const responce = await query(`
            SELECT to_regclass('employee_details');
            `);
        console.log(responce);
        if(!responce.rows[0].to_regclass){
            await query(createRoleQueary)
            await query(createEmployeesTable)
        }
        const {rows} = await query(allDetailsQueary)
        res.status(200).json(rows);
        

    }
    catch(error) {
        console.error("erroer",error)
    }
}*/

export async function getAllEmployees(req, res, next) {
    try {
        const response = await query(`SELECT to_regclass('employee_details');`);
        console.log(response);

        if (!response.rows[0].to_regclass) {
            await query(createRoleTypeSafely); // ✅ safely create ENUM
            await query(createEmployeesTable);  // ✅ then create table
        }

        const { rows } = await query(allDetailsQuery);
        return res.status(200).json(rows); // ✅ no res.send() after this
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}




export async function getEmployees(req, res, next) {
    
}

export async function updateEmployees(req, res, next) {
    
}

export async function createEmployees(req, res, next) {
    
}

export async function deleteEmployees(req, res, next) {
    
}