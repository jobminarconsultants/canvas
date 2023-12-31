import mongoose from "mongoose";
const cord=new mongoose.Schema({
  lat:Number,
  lon:Number

})
const dailyLocationSchema = new mongoose.Schema({
  date: {
    type: String, // Use Date as the type
    unique: true, // If you want it to be unique
  },
  startlocation: {
    type: [Number],
    index: "2dsphere",
  },
  endlocation: {
    type: [Number],
    index: "2dsphere",
  },
  distance:String,
});

const dailyForms=new mongoose.Schema({
  date: {
    type: String,
    unique: true, 
  },
  name: {
    type: String,
    // required: true,
  },
  sonWifeDaughter: {
    type: String,
    // required: true,
  },
  houseNumber: {
    type: String,
    // required: true,
  },
  colony: {
    type: String,
    // required: true,
  },
  villageDivision: {
    type: String,
    // required: true,
  },
  occupation: {
    type: String,
    // required: true,
  },
  totalNumberOfVoters: {
    type: String,
    // required: true,
  },
  totalNumberOfLocalVoters: {
    type: String,
    // required: true,
  },
  totalNumberOfNonLocalVoters: {
    type: String,
    // required: true,
  },
  caste: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  religion: {
    type: String,
    // required: true,
  },
  comments: {
    type: String,
  },
})

const useReports=new mongoose.Schema({
  houseNumber:String,
  name:String,
  issue:String,
  comments:String,
  img:{
    // data:Buffer,
    // contentType:String
    type:String
  }
})
const incident=new mongoose.Schema({
  comments:String,
  file:String
})

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
    ref: "Authcollection",
  },
  dailyLocations: [dailyLocationSchema],
  dailyForms:[dailyForms],
  reports:[useReports],
  incident:[incident],
  status:{
    type:String,
    default:'offline'
  },
  cords:[cord]

});
userSchema.set("strictPopulate", false);
const userModel = mongoose.model("usercollection", userSchema);
export default userModel;
