import mongoose from 'mongoose';

export const db = {
    connect: function () {
        mongoose.connect(
            'mongodb://localhost:27017/code-exec-db'
        )
        .then(() => console.log('MongoDB Connected'))
        .catch(err => { 
            console.log('nongodb connection failed: ' + err);
        });
    }
};



