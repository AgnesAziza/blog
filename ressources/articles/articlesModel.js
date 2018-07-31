
import mongoosePaginate from "mongoose-paginate";

module.exports = mongoose => {

  const Schema = mongoose.Schema;

  const ArticleSchema = Schema({
    title : {
      required: true,
      type: String,
    },

    description : {
      required: true,
      type: String,
    },

    date : {
      type: Date,
      default: () => new Date().toISOString()
    },

    id_User : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    etatPublication : {
      type: Boolean,
      default: false
    }
  });

  ArticleSchema.plugin(mongoosePaginate);

  return mongoose.model("Article", ArticleSchema);
}
