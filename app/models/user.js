import mongoose from 'mongoose';
import md5 from '../common/md5';

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

UserSchema.methods.add = function() {
    this.password = md5(this.password);

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

UserSchema.static('findByMail', function(email) {
    return new Promise((resolve, reject) => {
        this.findOne({ email: email }, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
});

export default mongoose.model('User', UserSchema);

