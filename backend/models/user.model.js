import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.virtual("confirmPassword")
  .get(function () { return this._confirmPassword; })
  .set(function (value) { this._confirmPassword = value; });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    if (this.password !== this._confirmPassword) {
      throw new Error("Password and confirm password must match");
    }
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
