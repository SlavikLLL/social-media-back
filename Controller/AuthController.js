import UserModel from "../Model/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req,res)=>{
   const {username,password,firstname,lastname} = req.body;
   const hash = await bcrypt.hash(password,10) ;
   const newUser = new UserModel({username,password:hash,firstname,lastname})
    

    try {
        const duplicate = await UserModel.findOne({username:username})
        if(duplicate){
            res.status(400).json({message:'user exist'})
        }
       const user = await newUser.save();
        const token = jwt.sign({
            username:user.username,
            id:user._id
        },process.env.JWT_KEY,{expiresIn:'1h'})
        res.status(200).json({user,token})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const logInUser = async(req,res) =>{
    const {username,password} = req.body;

    try {
        const user = await UserModel.findOne({username:username});
        if(user){
            const validity = await bcrypt.compare(password,user.password);

            if(!validity){
                res.status(400).json('wrong password')
            }else{
                const token = jwt.sign({
                    username:user.username,
                    id:user._id
                },process.env.JWT_KEY,{expiresIn:'1h'})
                res.status(200).json({user,token})
            }
        }else {
            res.status(400).json('User dont exist')
        }
    } catch (error) {
        console.log(error);
    }
}