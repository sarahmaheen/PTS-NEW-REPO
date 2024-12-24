import express from 'express'
import cors from 'cors'
import path from "path";
import dbConnect from './dbConnect.js';
import patient from "./controllers/patient.js"
import therapist from "./controllers/therapist.js"
import superAdmin from "./controllers/superAdmin.js"
import addtherapy from "./controllers/therapy.js"
// import Therapist from './models/Therapistmodel.js';
// import ./dbConnect
const app = express();
const port=process.env.port || 3007

app.use(cors()); // Enable CORS
app.use(express.json());


dbConnect();

app.use("/api",patient);
app.use("/api",addtherapy)
app.use("/api",therapist);
app.use("/api",superAdmin);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });