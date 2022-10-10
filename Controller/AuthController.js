import UserModel from "../Model/UserModel.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req,res)=>{
   const {username,password,firstname,lastname} = req.body;
   const hash = await bcrypt.hash(password,10) ;
   const newUser = new UserModel({username,password:hash,firstname,lastname})
    

    try {
        const duplicate = await UserModel.findOne({username:username})
        if(duplicate){
            res.status(400).json({message:'user exist'})
        }
        await newUser.save()
        res.status(200).json(newUser)
        
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

            validity? res.status(200).json(user) : res.status(400).json("Wrong password")
        }else {
            res.status(400).json('User dont exist')
        }
    } catch (error) {
        console.log(error);
    }
}