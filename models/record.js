const { Schema, model, default: mongoose } = require("mongoose");

const recordSchema = new Schema({
    amount: Number,
    type: {
        type: String,
        enum: ["income", "expense"]
    },
    category: String,
    date: Date,
    notes: String,
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{timestamps: true}
);

const Record = model("Record", recordSchema);

module.exports = Record;