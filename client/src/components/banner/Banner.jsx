
import {Box,Typography,styled} from '@mui/material';
const Image=styled(Box)`
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Heading= styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;
const SubHeading=styled(Typography)`
    font-size: 20px;
    background: #FFFFFF
`
const Tagline = styled(Typography)`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 1px;
    z-index: 2;
    font-style: italic;
`;

const Banner=()=>{
    return(
        <Image>
            <Heading>Plexi</Heading>
            <Tagline>"Where ideas compile into content"</Tagline>
        </Image>
    )
}
export default Banner;