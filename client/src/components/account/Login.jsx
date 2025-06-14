import { useState ,useContext} from 'react';
import { Box, TextField, Button, styled, Typography} from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import {useNavigate} from 'react-router-dom';
const Component=styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image=styled(`img`)({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});
const Wrapper=styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p{
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20% );
`;

const Error=styled(Typography)`
    font-size: 10px;
    color:#ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const Text =styled(Typography)`
    color: #878787;
    font-size: 16px;
`

const loginIntialValues={
    username: '',
    password: '',
}

const signupIntialValues={
    name: '',
    username: '',
    password: '',
}
const Login = ({isUserAuthenticated}) =>{
    const imageURL='https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account,toggleAccount]= useState('login');
    const [signup,setSignup] =useState(signupIntialValues);
    const [login,setLogin]= useState(loginIntialValues)
    const [error,setError]=useState('');
    const { setAccount }= useContext(DataContext);
    const navigate=useNavigate();
    const toggleSignUp = () => {
        account==='signup'?toggleAccount('login'):toggleAccount('signup');
    }
    const onInputChange = (e)=>{
        setSignup({...signup,[e.target.name]: e.target.value});
    }
    const signupUser = async () => {
    try {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError('');
            setSignup(signupIntialValues);
            toggleAccount('login');
        } else {
            setError('Something went wrong! Please try again later');
        }
    } catch (error) {
        console.error("Signup API failed:", error);
        setError('Something went wrong! Please try again later');
    }
};

const onValueChange=(e)=>{
    setLogin({ ...login,[e.target.name]:e.target.value})
}
const loginUser = async () => {
    try {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ username: response.data.username, name: response.data.name });
            isUserAuthenticated(true);
            navigate('/');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error("Login API failed:", error);
        setError('Something went wrong! Please try again later');
    }
};

    return(
        <Component> 
            <Box>
                <Image src={imageURL} alt="login"/>
                {
                    account==='login'?
                
                    <Wrapper>
                        <TextField variant="standard" value={login.username || ''} onChange={onValueChange} name="username" label="Enter Username" />
                        <TextField variant="standard" value={login.password || ''} onChange={onValueChange} name="password" label="Enter password" />

                        {error && <Error>{error}</Error>}
                        
                        <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
                        <Text style={{textAlign: 'center' }}>OR</Text>
                        <SignupButton onClick={()=>toggleSignUp()}>Create an account</SignupButton>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField variant="standard" value={signup.name || ''} onChange={onInputChange} name="name" label="Enter Name" />
                        <TextField variant="standard" value={signup.username || ''} onChange={onInputChange} name="username" label="Enter Username" />
                        <TextField variant="standard" value={signup.password || ''} onChange={onInputChange} name="password" label="Enter Password" />

                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={()=>signupUser()}>Signup</SignupButton>
                        <Text style={{textAlign: 'center' }}>OR</Text>
                        <LoginButton variant="contained" onClick={()=>toggleSignUp()}>Already have an account</LoginButton>
                    </Wrapper>
                }
            </Box> 
        </Component>
    )
}
export default Login;