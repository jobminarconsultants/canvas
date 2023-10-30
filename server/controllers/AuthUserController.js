import mongoose from "mongoose";
import AuthModel from "../model/AuthModel.js";
import userModel from "../model/UserModel.js";
import bcrypt from 'bcrypt';

export const userSignUp = async (req, res) => {
  const { name, email, password, mobile, oid, dailyLocations } = req.body; // dailyLocations is allowed to be empty or not provided

  try {
    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      return res.json({ message: 'Email id already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hash,
      mobile,
      oid,
      dailyLocations: dailyLocations || [],
    });

    await newUser.save();

    const RootUser = await AuthModel.findById(oid);
    console.log(RootUser)
    if (RootUser) {
      console.log(RootUser,'if')
      RootUser.users.push(newUser._id); // Push the new user's _id to RootUser's users array
      await RootUser.save();
      return res.json({ message: 'User signup successful' });
    } else {
      console.log(RootUser,"else")
      return res.json({ message: 'RootUser not found' });
    }
  } catch (err) {
    console.error(`Error from user signup controller: ${err.message}`);
    return res.status(500).json({ message: 'An error occurred during user signup' });
  }
};

// login controller
// export const userLoginController=async(req,res)=>{
//     const{email,password}=req.body;
//     const checkEmail=await userModel.findOne({email})
//     if(checkEmail){
//         const checkPassword=await bcrypt.compare(password,checkEmail.password)
//         if(checkPassword){
//             const token=await jwt.sign({email},process.env.TOKEN_SIGN)
//             res.json({message:'ok',msg:'login success',token:token,id:checkEmail.id})
//         }
       
//         else{
//             res.json({m:'wrong password'})
//         }
//     }
//     else{
//         res.json({m:'enter a valid email'})
//     }
// }
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
