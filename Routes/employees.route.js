import express from 'express'
import { 
    getAllEmployees, 
    getEmployees,
    createEmployees,
    updateEmployees, 
    deleteEmployees } from '../controller/employees.controller.js';

const router = express.Router();

router.get('/', getAllEmployees);

router.post('/', createEmployees);

router.get('/:id', getEmployees)

router.put('/:id', updateEmployees)

router.delete('/:id', deleteEmployees)

export default router;