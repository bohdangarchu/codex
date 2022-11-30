import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import internal from 'stream';
import mongoose from 'mongoose';


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
const SubmissionModel = require('./models/Submission').SubmissionModel;
const db = require('./config/DbSetup');
const submissionRouter = require('./routes/submissions');
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

app.use('/submissions', submissionRouter);

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});

interface Submission {
    code: string,
    langId: number
};

// function validateSubmissionRequest






