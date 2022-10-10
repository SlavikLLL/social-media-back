import UserModel from "../Model/UserModel.js";
import bcrypt from 'bcrypt'
//get user

export const getUser = async(req,res) =>{
    const id = req.params.id;

    
    try {
        const user = await UserModel.findById(id);
        if(user){
            const {password, ...otheDetails} = user._doc
            res.status(200).json(otheDetails)
        }else{
            res.status(404).json("no such user")
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (req,res) =>{
    const id = req.params.id;
    const {currentUserId,currentUserAdminStatus,password} = req.body;

    if(id===currentUserId || currentUserAdminStatus){
        try {
            if(password){
                req.body.password = await bcrypt.hash(password,10);
            }
        const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true});

        res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    }
   
}

export const deleteUser = async (req,res) =>{
    const id = req.params.id;

    const {currentUserId,currentUserAdminStatus} = req.body;
    if(id === currentUserId || currentUserAdminStatus) {
        try {
            const user = await UserModel.findByIdAndDelete(id)
            res.status(200).json("User deleted");
        } catch (error) {
            console.log(error);
        }
    }
}

export const followUser = async(req,res) =>{
    const id = req.params.id;

    const {currentUserId} = req.body;
    if(currentUserId === id){
        res.status(403).json('u cant follow yourself');
    }else{
        try {
            const followUser = await UserModel.findById(id);
            const follingUser =await UserModel.findById(currentUserId);

            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push:{followers:currentUserId}});
                await follingUser.updateOne({$push:{following:id}});
                res.status(200).json("User followed")
            }else{
                res.status(403).json('user already followed by you')
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const UnfollowUser = async(req,res) =>{
    const id = req.params.id;

    const {currentUserId} = req.body;
    if(currentUserId === id){
        res.status(403).json('u cant follow yourself');
    }else{
        try {
            const followUser = await UserModel.findById(id);
            const follingUser =await UserModel.findById(currentUserId);

            if(followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$pull:{followers:currentUserId}});
                await follingUser.updateOne({$pull:{following:id}});
                res.status(200).json("User unfollowed")
            }else{
                res.status(403).json('user is not  followed by you')
            }
        } catch (error) {
            console.log(error);
        }
    }
}