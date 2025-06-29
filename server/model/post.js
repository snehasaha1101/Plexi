import mongoose from 'mongoose';

const postSchema=mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    picture:{
        type: String,
        required: true,
        default: 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    },
    username:{
        type: String,
        required: true,
    },
    categories:{
        type: String,
        required: true,
    },
    createdDate:{
        type: Date,
    }
});
const Post=mongoose.model('post',postSchema);
export default Post;