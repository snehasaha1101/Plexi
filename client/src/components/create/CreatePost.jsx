import {useState, useEffect} from 'react';
import {Box,styled, FormControl, InputBase ,Button, TextareaAutosize} from '@mui/material';
import Add from '@mui/icons-material/AddCircle';
import { categories } from '../../constants/data';
const Container=styled(Box)`
    margin: 50px 100px
`
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
const CreatePost=()=>{
    const url='https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const [post,setPost] = useState(initialPost);
    useEffect(()=>{
        const getImage=()=>{
            
        }
    },[])
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]: e.target.value})
    }
    return(
        <Container>
            <Image src={url} alt="banner"/>
            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <Add fontsize="large" color="action"/>
                </label>
                <input type="file" id="fileInput" style={{display:'none'}}/>
                <InputTextField placeholder='Title' on Change={(e)=>handleChange(e)} name="title"/>
                <Button variant="contained">Publish</Button>
            </StyledFormControl>
            <Textarea
                minRows={5}
                placeholder="Share your ideas"
                onChange={(e)=>handleChange(e)}
                name="description"
            />
        </Container>
    )
}
export default CreatePost;