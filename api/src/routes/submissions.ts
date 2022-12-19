import express from 'express';
import { Publisher } from '../services/Publisher';
export const router = express.Router();
const SubmissionModel = require('../models/Submission').SubmissionModel;
const publisher = new Publisher();
publisher.init();


router.get('/:id', async (req, res) => {
    // TODO hide certain fields
    const id: string = req.params.id;
    console.log(`GET request for id ${id}`);
    const sub = await SubmissionModel.find({'_id': id});
    res.send(JSON.stringify(sub));
});

router.post('', async (req, res) => {
    console.log(`request body: ${JSON.stringify(req.body)}`);
    validateRequest(req, res);
    const subm = new SubmissionModel(req.body);
    subm.save()
        .then((s: any) => { 
            console.log(`submission ${s} saved`);
            publisher.processSubmission({
                submId: s._id,
                langId: s.langId
            });
            res.send({
                submissionId: s._id
            });
        })
        .catch((err: any) => { 
            if (err.name === "ValidationError") {
                let errors = {};
                Object.keys(err.errors).forEach((key) => {
                    errors[key] = err.errors[key].message;
                });

                return res.status(400).send(errors);
            }
            res.status(500).send("Something went wrong!");
        });
})

function validateRequest (req: any, res: any) {
    const { code, langId } = req.body;
    if (!code || !langId) {
        res.status(400).send({
            message: "code or langId is missing!"
        });
    }
}

