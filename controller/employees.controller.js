import { query } from "../utils/connectToDB.js";
import { createRoleTypeSafely, 
    createEmployeesTable,
    allDetailsQuery , 
    createEmployeesQuery,
    getEmployeesQuery, 
    deleteEmployeesQuery,
    updateEmployeesQuery
} from "../utils/sqlQuery.js";
import { createError } from "../utils/error.js";
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
        console.log(error.message);
        return next(createError(400, "Coun't get employees Details!"));
    }
}




export async function getEmployees(req, res, next) {
    
        const id = req.params.id;
        const data = await query(getEmployeesQuery,[id])
        console.log(data)
        if(!data.rows.length){
           return next(createError(400,"Employee not found"))
        }
    return res.status(200).json(data.rows[0])
}

export async function updateEmployees(req, res, next) {
  try {
    const { id } = req.params;
    

    const { name, email, age, role, salary } = req.body;

    if (!name || !email || !age || !role || !salary) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await query(updateEmployeesQuery, [
      name.trim(),
      email.trim().toLowerCase(),
      age,
      role,
      salary,
      id
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employee Not Found!" });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      employee: result.rows[0]
    });
  } catch (error) {
    console.error("Update error:", error.message);
    return next(createError(500, "Failed to update employee"));
  }
}


export async function createEmployees(req, res, next) {
    try {
        let {name, email, age, role, salary } = req.body;

        //Normaliza input
        const trimname = name?.trim();
        const trimemail = email?.trim().toLowerCase();

        //Validate required fields
        if(!trimname || !trimemail|| !age || !salary ){
            return res.status(400).json({error: "Missing Fields"})
        };
        const data = await query(createEmployeesQuery,[
            trimname,
            trimemail,
            age,
            role,
            salary
        ]);
       return res.status(201).json(data.rows[0])
    } catch (error) {
        if (error.code === '23505') {
           return res.status(409).json({ error: 'Email or name already exists' });
        }

        console.log(error.message);
        return next(createError(400, error.message))
    }
}

export async function deleteEmployees(req, res, next) {
     const id  = req.params.id;
        const data = await query(deleteEmployeesQuery ,[id])
        console.log(data)
        if(!data.rowCount){
           return next(createError(400,"Employee not found"))
        }
    return res.status(200).json({message : "Delete successfully!"})
}