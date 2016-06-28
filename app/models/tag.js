import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var TagSchema =  new Schema({
    name: String,
});

TagSchema.methods.add = function() {
    return new Promise((resolve, reject) => {
        this.save((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

TagSchema.static('isExisted', function(name) {
    return new Promise((resolve, reject) => {
        this.findOne({ name: name }, (err, tag) => {
            if (err) {
                reject(err);
            } else {
                resolve(tag);
            }
        });
    });
});
TagSchema.static('findAll', function() {
    return new Promise((resolve, reject) => {
        this.find({}, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
});

export default mongoose.model('Tag', TagSchema);

