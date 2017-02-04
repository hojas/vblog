import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    url: String,
    name: String,
    index: Number,
});

categorySchema.statics.findAll = async function() {
    let cates = await this.find();
    return cates;
};

categorySchema.statics.findByUrl = async function(url) {
    let cate = await this.findOne({ url });

    if (cate) {
        return cate;
    }
    return { status: 'error', msg: '此分类不存在' };
};

let Category = mongoose.model('Category', categorySchema);

export { Category };

