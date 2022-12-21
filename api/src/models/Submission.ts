import mongoose from 'mongoose';
import { LanguageList } from '../config/Languages'
import { ListCollectionsCursor } from 'mongodb';

export interface Submission {
    _id: string,
    code: string,
    langId: number,
    status: string,
    args: [string],
    output: {
        stdout: string,
        stderr: string,
        timeout: boolean
    }
}

const SubmissionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    langId: {
        type: Number,
        required: true,
        validate: validateLangId
    },
    status: {
        type: String,
        default: "Running"
    },
    args: {
        type: [String],
        default: []
    },
    output: {
        type: {
            stdout: String,
            stderr: String,
            timeout: {
                type: Boolean,
                default: false
            }
        }
    }
});



function validateLangId(id: number) {
    return LanguageList.map(lang => lang['id']).includes(id);
}

export const SubmissionModel = mongoose.model<Submission>("Submission", SubmissionSchema);