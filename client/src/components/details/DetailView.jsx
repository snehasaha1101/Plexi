import { useEffect,useState,useContext } from 'react';
import{Box,Typography,styled} from '@mui/material';
import { useParams } from 'react-router-dom';
import {API} from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Container=styled(Box)`
    margin: 50px 100px;
`
const Image=styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
})
const Heading=styled(Typography)`
    font-size: 24px;
    font-weight: 600;
    margin: 35px 0;
    text-align: center;
`
const Edit=styled(EditIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid  #878787;  
    border-radius: 50%;
`
const Delete=styled(DeleteIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid  #878787;  
    border-radius: 50%;
`

const DetailView=()=>{
    const [post,setPost]=useState({});
    const {id}=useParams();
    const {account}=useContext(DataContext);
    useEffect(()=>{
        const fetchData=async()=>{
           let response = await API.getPostById(id);
           if(response.isSuccess){
            console.log("✅ Setting post:", response.data);
                setPost(response.data);
           } else {
            console.log("❌ Failed to fetch post");
        }
        }
        fetchData();
    },[])
    return(
        <Container>
            <img src={post.picture} alt="post" style={{width:'100%',height:'50vh',objectFit:'cover'}}/>
            <Box style={{float: 'right', margin: '20px'}}>
                {
                    account.username === post.username &&
                    <>
                         <Edit color="primary" style={{cursor: 'pointer'}}/>
                        <Delete color="error" style={{cursor: 'pointer'}}/>
                    </>
                }
               
            </Box>
            <Heading>{post.title}</Heading>
            <Box>
                <Typography>{post.username}</Typography>
                <Typography>{new Date(post.createdDate).toDateString()}</Typography>
            </Box>
            <Typography>{post.description}</Typography>
        </Container>
    );
}
export default DetailView;