import AuthModel from "../model/AuthModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userModel from "../model/UserModel.js";
// sign up controller
export const SignUpController=async(req,res)=>{
    const {name,email,password,mobile}=req.body
    try{
   const checkEmail=await AuthModel.findOne({email})
//    const check= checkEmail.mobile
//    const checkPassword=await AuthModel.findOne({password})
   if(checkEmail){
    res.json({message:'email id already exists'})
   }
   else if(checkEmail&&checkEmail.mobile==mobile){
    res.json({message:'mobile number already exists'})
   }
   else{
    const hash=await bcrypt.hash(password,10)
    const newUser=new AuthModel({
        name,email,password:hash,mobile
    })
    await newUser.save()
    res.json({message:'ok',msg:'signup successfull'})
   }

    }
    catch(err){
        res.json({message:`this is the error from the signup controller ${err}`})
    }
}
// login controller
export const LoginController=async(req,res)=>{
    const{email,password}=req.body;
    const checkEmail=await AuthModel.findOne({email})
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
// get all my users
export const getMyUsers=async(req,res)=>{
    const oid=req.params.id
    const users=await userModel.find({oid}).populate('users')
    try{
        res.json({message:'ok',data:users})
    }
    catch(err){
        res.json({message:`this is the error fromm get my users component `})
    }
}