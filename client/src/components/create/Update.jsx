import {useState, useEffect, useContext} from 'react';
import {Box,styled, FormControl, InputBase ,Button, TextareaAutosize} from '@mui/material';
import Add from '@mui/icons-material/AddCircle';

import {useLocation,useNavigate,useParams} from 'react-router-dom';
import {DataContext} from '../../context/DataProvider';
import { API } from '../../service/api.js';
const Container=styled(Box)(({theme})=>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '50px 20px',
    },
}));
const Image=styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
})

const StyledFormControl=styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;
const InputTextField=styled(InputBase)`
    flex:1;
    margin: 0 30px;
    font-size: 25px;
`
const Textarea=styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible{
        outline: none;
    }
`;
const initialPost={
    title: '',
    description: '',
    picture:'',
    username:'',
    categories: '',
    createdDate: new Date()
}
const Update=()=>{
    const [post,setPost] = useState(initialPost);
    const [file,setFile]=useState('');
    const {account}=useContext(DataContext);
    const location=useLocation();
    const navigate=useNavigate();
    const {id} = useParams();
    const url=post.picture?post.picture:'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

   /* useEffect(()=>{
    const getImage=async()=>{
        if(file){
            const data=new FormData();
            data.append("name",file.name);
            data.append("file",file);

            for (let pair of data.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            const response=await API.uploadFile(data);
            post.picture=response.data;
        }
    }
    getImage();
    
    const rawCategory = location.search?.split('=')[1] || 'All';
    post.categories = decodeURIComponent(rawCategory);
    post.username = account.username;
},[file])*/
useEffect(() => {
    const fetchData = async () => {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
            setPost(response.data);
        } else {
            console.error("Failed to fetch post:", response.error);
        }
    }; fetchData();
}, [])
useEffect(() => {
    const getImage = async () => {
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            const response = await API.uploadFile(data);
            setPost(prev => ({
                ...prev,
                picture: response.data
            }));
        }
    };
    getImage();

    
}, [file]);
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]: e.target.value})
    }
    const updateBlogPost = async () => {
    const rawCategory = location.search?.split('=')[1] || 'All';
    const completePost = {
        ...post,
        categories: rawCategory,
        username: account.username,
        createdDate: new Date()
    };
    let response = await API.updatePost(id, completePost);
    if (response.isSuccess) {
        navigate(`/details/${id}`);
    }
}
    return(
        <Container>
            <Image src={url} alt="banner"/>
            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <Add fontSize="large" color="action"/>
                </label>
                <input type="file" 
                id="fileInput" 
                style={{display:'none'}}
                onChange={(e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    console.log("📂 File selected:", selectedFile);
    console.log("🧾 Selected file type:", selectedFile.type); // 👈 This logs MIME type
    setFile(selectedFile);
  }
}}

                />
                <InputTextField placeholder='Title' value={post.title}onChange={(e)=>handleChange(e)} name="title"/>
                <Button variant="contained" onClick={()=>updateBlogPost()}>Edit</Button>
            </StyledFormControl>
            <Textarea
                minRows={5}
                placeholder="Share your ideas" value={post.description}
                onChange={(e)=>handleChange(e)}
                name="description"
            />
        </Container>
    )
}
export default Update;