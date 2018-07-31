
import mongoosePaginate from "mongoose-paginate";

module.exports = mongoose => {

  const Schema = mongoose.Schema;

  const LikeSchema = Schema({
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

    id_Comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  });

  LikeSchema.plugin(mongoosePaginate);

  return mongoose.model("Like", LikeSchema);
}
