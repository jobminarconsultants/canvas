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