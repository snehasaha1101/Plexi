
import {Box, Typography, styled} from '@mui/material';
import {addElipse} from '../../../utils/common-utils.js';
const Container=styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px 0;
    width: 100%;
    height: 380px;
    width: 300px;
    max-width: 350px;
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
const Details=styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    margin: 5px 0;
`;
const StyledDate=styled(Typography)`
    font-size: 14px;
    color: #878787;
    margin-top: auto;
    padding: 5px;
`;

const Post=({post})=>{
    return(
        <Container>
            <Image src={post.picture} alt="blog" />
            <Text>{decodeURIComponent(post.categories)}</Text>
            <Heading>{addElipse(post.title,40)}</Heading>
            <Typography>Author: {post.username}</Typography>
           <Details>{addElipse(post.description,40)}</Details>
           <StyledDate>{new Date(post.createdDate).toDateString()}</StyledDate>
        </Container>
    )
}
export default Post;