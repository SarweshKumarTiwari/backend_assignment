import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

interface User{
    name:string
    email:string
    password:string
    refresh_token:string
}

interface userMethods{
    compare(password:string):Promise<boolean>
    refreshToken():string
    accessToken():string
}
const user = new Schema<User,{},userMethods>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required:false,
    }
},
    {
        timestamps: true
    }
)

user.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,8);
})

user.methods.compare=async function(password:string){
    return await bcrypt.compare(password,this.password);
}

user.methods.accessToken=function(){
    const access_token=jwt.sign({
        id:this._id,
    },process.env.ACCESS_TOKEN as string,{
        expiresIn: Number(process.env.ACCESS_LIMIT)
    });
    return access_token;
}

user.methods.refreshToken=function(){
    const refresh_token=jwt.sign({
        id:this._id,
    },process.env.REFRESH_TOKEN as string,{
        expiresIn: Number(process.env.REFRESH_LIMIT)
    });
    return refresh_token;
}



export default mongoose.model("users",user);