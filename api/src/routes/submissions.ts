import express from 'express';
import { Publisher } from '../services/Publisher';
import { Submission, SubmissionModel } from '../models/Submission';
export const router = express.Router();
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
        .then(async (s: Submission) => { 
            publisher.processSubmission({
                submId: s._id,
                langId: s.langId
            });
            // wait for db update
            const result = await getUpdatedSubmission(s._id);
            res.send(result);
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

async function getUpdatedSubmission(id: string): Promise<Submission> {
    await sleep(5);
    let result = await SubmissionModel.findById(id);
    while(true) {
        if (result.status === 'Finished') {
            return result;
        }
        sleep(1);
        result = await SubmissionModel.findById(id);
    }
}

function sleep(s: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, s*1000);
    });
  }

