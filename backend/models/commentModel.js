const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  

// commentSchema.statics.validatecomment = async function ( message, user){
//     if(!message){
//         throw Error("You cant make an empty comment!")
//     }

//     const comment = await this.create({comment, user})
//     return comment;
// }

module.exports = mongoose.model("Comment", commentSchema)