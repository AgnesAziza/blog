
import mongoosePaginate from "mongoose-paginate";

module.exports = mongoose => {

  const Schema = mongoose.Schema;

  const CommentSchema = Schema({
    comment: {
      type: String,
      required: true
    },

    date : {
      type: Date,
      default: () => new Date().toISOString()
    },

    id_User : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    id_Article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
    }
  });

  CommentSchema.plugin(mongoosePaginate);

  return mongoose.model("Comment", CommentSchema);
}
