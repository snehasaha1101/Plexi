import {useEffect, useState} from 'react';
import {Box, Grid } from '@mui/material';
import { API } from '../../../service/api.js';
import Post from './Post.jsx'; 
const Posts=()=>{
    const [posts,setposts]=useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            let response=await API.getAllPosts();
            if(response.isSuccess){
                setposts(response.data);
            } else {
                console.error("Failed to fetch posts:", response.error);
            }
        }
        fetchData();
    },[]);
    /*return (
        <>
        {
            posts && posts.length > 0?posts.map((post) => (
                <Posts post={post}/>
            )): <Box style={{color: '#878787', margin: '30px 80px',fontSize: 18}}>No data available to display</Box>
        }
        </>
    );*/
    
return (
    <>
    {
        posts && posts.length > 0 ? posts.map((post) => (
            <Grid item lg={3} sm={4} xs={12} >
            <Post key={post._id} post={post}/>
            </Grid>
        )) : <Box style={{color: '#878787', margin: '30px 80px',fontSize: 18}}>No data available to display</Box>
    }
    </>
);

}
export default Posts;