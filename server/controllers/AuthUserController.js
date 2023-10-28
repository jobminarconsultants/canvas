import mongoose from "mongoose";
import AuthModel from "../model/AuthModel.js";
import userModel from "../model/UserModel.js";
import bcrypt from 'bcrypt';

export const userSignUp = async (req, res) => {
    const { name, email, password, mobile, oid } = req.body;
    try{
        const checkEmail=await userModel.findOne({email})
        if(checkEmail){
            res.json({message:'email id already exists'})
        }
        else if(checkEmail&&checkEmail.mobile==mobile){
            res.json({message:'mobile number already exists '})
        }
        else{
            const hash=await bcrypt.hash(password,10)
            const newUser=new userModel({
                name,email,password:hash,mobile,oid
            })
            await newUser.save()
           const RootUser=await AuthModel.findById(oid)
           RootUser.users.push(oid)
           await RootUser.save()
           res.json({message:'ok',msg:'user sign in done '})
        }
    }
    catch(err){
        res.json({message:`this is the error from user signup controller ${err}`})
    }
};
// login controller
export const userLoginController=async(req,res)=>{
    const{email,password}=req.body;
    const checkEmail=await userModel.findOne({email})
    if(checkEmail){
        const checkPassword=await bcrypt.compare(password,checkEmail.password)
        if(checkPassword){
            const token=await jwt.sign({email},process.env.TOKEN_SIGN)
            res.json({message:'ok',msg:'login success',token:token,id:checkEmail.id})
        }
       
        else{
            res.json({m:'wrong password'})
        }
    }
    else{
        res.json({m:'enter a valid email'})
    }
}
// get co ordinates post api

export const PostCoordinates = async (req, res) => {
  try {
    const { startLocation, endLocation, date } = req.body;
    const userId = req.params.id;

    // Find the user by ID
    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
      }
  
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
    // Check if the user already has a location entry for the specified date
    const existingLocation = user.dailyLocations.find((location) => location.date.toISOString() === date);
    if (existingLocation) {
      // If a location entry already exists for this date, update it
      // existingLocation.startlocation = startLocation;
      existingLocation.endlocation = endLocation;
      res.json({message:'end location updated'})
    } else {
      // If not, create a new location entry for the date
      user.dailyLocations.push({
        date,
        startlocation: startLocation,
        endlocation: endLocation,
      });
    }
    await user.save();
    res.json({ message: 'Location data posted successfully' });
  } catch (err) {
    // console.error(err);
    res.json({ error: `Error from PostCoordinates controller ${err}` });
  }
};
