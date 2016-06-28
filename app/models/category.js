import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    url: String,
    name: String,
    index: Number,
});

CategorySchema.static('findByUrl', function(url) {
    return new Promise((resolve, reject) => {
        this.findOne({ url: url }, (err, cate) => {
            if (err || !cate) {
                reject(err || '此分类不存在');
            } else {
                resolve(cate);
            }
        });
    });
});

CategorySchema.static('findAll', function() {
    return new Promise((resolve, reject) => {
        this.find({}, (err, cats) => {
            if (err) {
                reject(err);
            } else {
                resolve(cats);
            }
        });
    });
});

export default mongoose.model('Category', CategorySchema);

