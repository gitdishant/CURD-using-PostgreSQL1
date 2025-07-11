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

// 📦 Routes
app.use("/api/employees", employeesRoutes);


app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})