import express from 'express';
const router = express.Router();
const SubmissionModel = require('../models/Submission').SubmissionModel;


router.get('/:id', async (req, res) => {
    const id: string = req.params.id;
    const sub = await SubmissionModel.find({'_id': id});
    console.log(`found sub ${sub}`);
    res.send(JSON.stringify(sub));
});

router.post('', (req, res) => {
    console.log(`request body: ${JSON.stringify(req.body)}`);
    validateRequest(req, res);
    const subm = new SubmissionModel(req.body);
    subm.save()
        .then((s: any) => { 
            console.log(`submission ${s} saved`);
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

function validateRequest (req, res) {
    const { code, langId } = req.body;
    if (!code || !langId) {
        res.status(400).send({
            message: "code or langId is missing!"
        });
    }
}

module.exports = router;

// app.get('/submissions/:id', async (req, res) => {
//     const id: string = req.params.id;
//     const sub = await SubmissionModel.find({'_id': id});
//     console.log(`found sub ${sub}`);
//     res.send(JSON.stringify(sub));
// });

// app.post('/submissions', (req, res) => {
//     console.log(`request body: ${JSON.stringify(req.body)}`);
//     const { code, langId } = req.body;
//     if (!code || !langId) {
//         res.status(400).send({
//             message: "code or langId is missing!"
//         });
//     }
//     const subm = new SubmissionModel(req.body);
//     subm.save()
//         .then((s: any) => { 
//             console.log(`submission ${s} saved`);
//             res.send({
//                 submissionId: s._id
//             });
//         })
//         .catch((err: any) => { 
//             if (err.name === "ValidationError") {
//                 let errors = {};
//                 Object.keys(err.errors).forEach((key) => {
//                     errors[key] = err.errors[key].message;
//                 });

//                 return res.status(400).send(errors);
//             }
//             res.status(500).send("Something went wrong!");
//         });
// });
