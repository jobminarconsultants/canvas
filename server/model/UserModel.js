import mongoose from "mongoose";

const dailyLocationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  startlocation: {
    type: [Number],
    index: '2dsphere',
  },
  endlocation: {
    type: [Number],
    index: '2dsphere',
  },
});

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  mobile: String,
  oid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authcollection',
  },
  dailyLocations: [dailyLocationSchema],
});

userSchema.set('strictPopulate', false);

const userModel = mongoose.model('usercollection', userSchema);

export default userModel;
