
import { categories } from '../../client/src/constants/data.js';
import Post from '../model/post.js'
/*export const createPost=async(request,response)=>{
    try{
        const post=await new Post(request.body);
        post.save();
        return response.status(200).json('Post saved successfully');
    }catch(error){
        return response.status(500).json(error);
    }
}*/
export const createPost = async (request, response) => {
    try {
        // Remove empty picture field so default is used
        if (request.body.picture === "") {
            delete request.body.picture;
        }
        const post = new Post(request.body);
        await post.save();
        return response.status(200).json('Post saved successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
}
export const getAllPosts = async (request, response) => {
    let category = request.query.category || '';
    let posts;
    try{
        if (category) {
            posts = await Post.find({categories: category});
        }else{
            posts=await Post.find({});
        }
        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({mssg:error.message})
    }
}
export const getPost=async(request,response)=>{
    try{
        const post=await Post.findById(request.params.id);
        return response.status(200).json(post);
    }catch(error){
        return response.status(500).json({msg: error.message})
    }
}
export const updatePost=async(request,response)=>{
    try{
        const post=await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg: "Post not found"});
        }
        await Post.findByIdAndUpdate(request.params.id, {$set: request.body})
        return response.status(200).json({msg:'Post updated successfully'});
    }catch(error){
        return response.status(500).json({error: error.message});
    }
}
export const deletePost=async(request,response)=>{
    try{
        const post=await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg: "Post not found"});
        }
        await post.deleteOne();
        return response.status(200).json({msg:'Post deleted successfully'});
    }catch(error){
         console.error("Delete post error:", error); 
        return response.status(500).json({error: error.message});
    }
}