import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 30 },
    lastName: { type: String, required: true, min: 2, max: 30 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, min: 8 }, // Removed unique: true
    picturePath: { type: String, default: "" },
    friends: { type: Array, default: [] },
    location: String,
    occupation: String,
    viewedProfile: { type: Number, default: 0 }, // Added default: 0
    impressions: { type: Number, default: 0 }, // Added default: 0
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
