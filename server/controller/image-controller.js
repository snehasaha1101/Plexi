import grid from 'gridfs-stream';
import mongoose from 'mongoose';
const url = 'http://localhost:8000';

const conn=mongoose.connection;
let gfs,gridfsBucket;
conn.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
});

export const uploadImage = (request, response) => {
      console.log('📸 File received:', request.file); // ← Add this
    if (!request.file) {
        return response.status(404).json({ msg: "File not found" });
    }

    const imageURL = `${url}/uploads/${request.file.filename}`;
    return response.status(200).json(imageURL);
};
export const getImage=async(request,response)=>{
    try{
        const file=await gfs.files.findOne({filename:request.params.filename});
        const readStream=gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    }catch(error){
        return response.status(500).json({msg: error.message})
    }
}