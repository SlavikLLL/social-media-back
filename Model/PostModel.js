import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    desc:String,
    likes:[],
    image:String,

},
{timestamps:true}
)

const PostModel = mongoose.model('Posts',postSchema);

export default PostModel;