import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";


dotenv.config();
/**
 * App Variables
 */

// check if PORT is in .env
if (!process.env.PORT) {
    process.exit(1);
}

const PORT = parseInt(process.env.PORT as string);
const app = express();
import { SubmissionModel } from './models/Submission';
import { db } from './config/DbSetup';
import { router } from './routes/submissions';
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());


/**
 * Server Activation
 */

db.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/submissions', router);

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});

interface Submission {
    code: string,
    langId: number
};

// function validateSubmissionRequest






