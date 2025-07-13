import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import employeesRoutes from './Routes/employees.route.js'

dotenv.config();

const app = express();
const PORT =  process.env.PORT || 3000;




const corsOptions = {
    origin: '*'
}

app.get('/api/health', (_, res) => {
    res.status(200).json({ status: 'Server is healthy 💪' });
});

// 🌐 Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(function(req,res){
    res.status(404).json({error: "Not Found!"})
});

// 📦 Routes
app.use("/api/employees", employeesRoutes);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({error : message})
})

app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})