const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    birthDate:{
        type:Date,
        required: true
    },
    creationDate:{
        type: Date,
        default: Date.now,
    }
});

userSchema.pre('save', async function(next){
    //Hash the password with a salt round of 10
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});
userSchema.methods.isValidPassword = async function(password){
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    const compare = await bcrypt.compare(password, this.password);
    return compare;
}
module.exports = mongoose.model("User", userSchema);