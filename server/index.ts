import 'dotenv/config'
import express, { Express  } from 'express';
import {initCORS} from "@startup/cors";
import {initDatabase} from "@startup/db";
import {initRoutes} from "@routes/index";


const app: Express = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

initCORS(app);
initDatabase()
initRoutes(app)

// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
