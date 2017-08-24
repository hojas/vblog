import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: String
});

tagSchema.statics.add = async function(tag) {
  let document = await this.findOne({ name: tag.name });
  if (document) {
    return { status: "error", msg: "此标签已存在" };
  }

  await tag.save();
  return { ok: true, msg: "标签添加成功", tag };
};

tagSchema.statics.findByName = async function(name) {
  if (!name) {
    return { ok: false, tag: null };
  }

  let tag = await this.findOne({ name });
  if (tag) {
    return tag;
  }
  return { ok: false, msg: "此标签不存在", tag: null };
};

tagSchema.statics.findAll = async function() {
  let tags = await this.find({});
  return { tags };
};

let Tag = mongoose.model("Tag", tagSchema);

export { Tag };
