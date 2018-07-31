import passportLocalMongoose from "passport-local-mongoose";

module.exports = (mongoose) => {
  "use strict";

  const Schema = mongoose.Schema;

  const UserSchema = Schema({
    nom : {
      required: true,
      type: String,
    },

    prenom : {
      required: true,
      type: String,
    },

    email : {
      required: true,
      type: String,
      unique: true
    },

    group : {
      required: true,
      type: String,
    }
  });

  UserSchema.plugin(passportLocalMongoose, {
    usernameQueryFields: ["email"], //Dit quel champ est utilisé pour s'authentifier
    limitAttempts: true,
    maxAttempts: 5,
    usernameUnique: true
  });

  return mongoose.model("User", UserSchema);
}
