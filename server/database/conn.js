import mongoose  from "mongoose";
const DataBaseConnection=async()=>{
    await mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>console.log('connected to database'))
    .catch((err)=>console.log(`the error is from mongoose${err}`))
}
export default DataBaseConnection