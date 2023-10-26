import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name: String,
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    mobile: String,
    oid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Authcollection'
    },
    coordinates:{
        type:Array
    }
  }
  );
  userSchema.set('strictPopulate', false);


  const userModel=mongoose.model('usercollection',userSchema)
  export default userModel