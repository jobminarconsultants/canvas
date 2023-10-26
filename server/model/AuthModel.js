import mongoose from "mongoose";
const AuthSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  mobile: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
      ref: "usercollection", // Reference the collection name here
    },
  ],
});

const AuthModel = mongoose.model("Authcollection", AuthSchema);
export default AuthModel;
