import {useEffect, useState} from 'react';
import {Box, Grid } from '@mui/material';
import { useSearchParams, Link } from 'react-router-dom';
import { API } from '../../../service/api.js';
import Post from './Post.jsx'; 
const Posts=()=>{
    const [posts,setposts]=useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category'); 
    useEffect(()=>{
        const fetchData = async () => {
            let response=await API.getAllPosts({category: category || ''});
            if(response.isSuccess){
                setposts(response.data);
            } else {
                console.error("Failed to fetch posts:", response.error);
            }
        }
        fetchData();
    },[category]);
    /*return (
        <>
        {
            posts && posts.length > 0?posts.map((post) => (
                <Posts post={post}/>
            )): <Box style={{color: '#878787', margin: '30px 80px',fontSize: 18}}>No data available to display</Box>
        }
        </>
    );*/
    const reversedPosts = [...posts].reverse();

   return (
    <Box sx={{ flexGrow: 1, padding: 2, maxWidth: '1200px', margin: 'auto' }}>
        <Grid container spacing={3}>
            {reversedPosts.length > 0 ? (
                reversedPosts.map((post) => (
                    <Grid item key={post._id} lg={4} md={4} sm={12} xs={12}>
                        <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18, textAlign: 'center' }}>
                        No data available to display
                    </Box>
                </Grid>
            )}
        </Grid>
    </Box>
);
}
    
/*return (
    <>
    {
        posts && posts.length > 0 ? posts.map((post) => (
            <Grid item lg={3} sm={4} xs={12} >
                <Link to={`details/${post._id}`}style={{textDecoration: 'none', color: 'inherit'}}>
                    <Post key={post._id} post={post}/>
            </Link>
            </Grid>
        )) : <Box style={{color: '#878787', margin: '30px 80px',fontSize: 18}}>No data available to display</Box>
    }
    </>
);

}*/
export default Posts;