module.exports = mongoose => {
    "use strict";

    const Schema = mongoose.Schema;

    const TokenSchema = Schema({
        token: {
            type: String,
            required: true
        },
        creation: {
            type: Date,
            required: true,
            default: () => new Date().toISOString()
        },
        id_User: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    });

    return mongoose.model("Token", TokenSchema);
};
