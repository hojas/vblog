import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name: String,
});

tagSchema.statics.add = async function(tag) {
    let document = await this.findOne({ name: tag.name });
    if (document) {
        return { status: 'error', msg: '此标签已存在' };
    }

    let t = await tag.save();
    return { status: 'success', msg: '标签添加成功', tag };
}

tagSchema.statics.findByName = async function(name) {
    if (!name) {
        return { status: 'error' };
    }

    let tag = await this.findOne({ name });
    if (tag) {
        return tag;
    }
    return { status: 'error', msg: '此标签不存在' };
};

tagSchema.statics.findAll = async function() {
    let tags = await this.find({});
    return { tags };
};

let Tag = mongoose.model('Tag', tagSchema);

export { Tag };

