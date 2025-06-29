
import {Box, Typography, styled} from '@mui/material';

const Container=styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px 0;
    width: 100%;
    height: 350px;
    max-width: 320px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    &>p{
        padding: 0 5px 5px 5px;
    }
`;
const Image=styled('img')({
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0'
});
const Text=styled(Typography)`
    font-size: 14px;
    color: #878787;
    margin: 5px 0;
`;
const Heading=styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`
const Post=({post})=>{
    return(
        <Container>
            <Image src={post.picture} alt="blog" />
            <Text>{decodeURIComponent(post.categories)}</Text>
            <Heading>{post.title}</Heading>
            <Typography>Author: {post.username}</Typography>
           {/* <Typography>{post.description}</Typography> */}
        </Container>
    )
}
export default Post;