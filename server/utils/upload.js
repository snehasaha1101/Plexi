import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { GridFsStorage } from 'multer-gridfs-storage'
// Ensure 'uploads/' folder exists
/*const uploadPath = 'uploads';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // saves to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});*/
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
const storage =new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.19lfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    file:(request,file)=>{
        const match=["image/png","image/jpg","image/jpeg"];
        console.log("📨 Uploaded file MIME type:", file.mimetype);

        if(match.indexOf(file.mimetype)===-1){
        //return `${Date.now()}-blog-${file.originalname}`;
        
    return Promise.reject(new Error('Only PNG and JPG files are allowed!'));


        }
        return{
            bucketName:'fs',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
    
});


export default multer({ storage });

