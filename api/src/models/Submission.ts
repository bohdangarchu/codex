import mongoose from 'mongoose';
import { LanguageList } from '../config/Languages'

const SubmissionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    langId: {
        type: Number,
        required: true,
        validate: (value: number) => {
            return validateLangId(value);
        }
    }
});



function validateLangId(id: number) {
    return LanguageList.map(lang => lang['id']).includes(id);
}

export const SubmissionModel = mongoose.model("Submission", SubmissionSchema);