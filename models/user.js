const bcrypt = require("bcrypt");
const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema ({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["viewer", "analyst", "admin"],
        default: "viewer"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    financialRecords: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Record"
        }
    ]
},{timestamps: true}
);
userSchema.pre("save", async function (next) {
    const user = this;
    if(!user.isModified("password")) return next();
    const hashed = await bcrypt.hash(user.password, 10);
    this.password = hashed;
});
const User = model("user", userSchema);

module.exports = User;