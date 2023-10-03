import React, { useState } from 'react'
import Loginiigg from "../assets/Rectangle.png"
import "./LoginSignUp.css"
import { post } from '../api/ApiService';
import { useToast } from '@chakra-ui/react';
import PasswordResetModal from './PasswordResetModal';
import { useNavigate } from "react-router-dom"
import { validateEmail, validatePassword, validatePhoneNumber } from './validation';
import {

    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    InputGroup,
    InputLeftAddon,
    Input,
    InputRightElement,
    Button,
    PinInput,
    PinInputField,

} from '@chakra-ui/react';

const SignUpDetails = {
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    otp: ""
};

const LoginDetails = {

    email: "",
    password: "",

};
function LoginSignUp({ IsOpen, onClick, sendDataToParent }) {
    const [pinValues, setPinValues] = useState(['', '', '', '', '', '']);
    const [SignUp, setSignUp] = useState({ ...SignUpDetails });
    console.log(SignUp, "uggoi")
    const [LogIn, setLogIn] = useState({ ...LoginDetails });
    const [AdminLogIn, setAdminLogIn] = useState({ ...LoginDetails });
    const [response, setResponse] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(IsOpen);
    const [adminLogin, setAdminLogin] = useState(false)
    const [loginPop, setSloginPop] = useState(false)
    const [show, setShow] = React.useState(false)
    const [showPinInput, setShowPinInput] = useState(false);
    const handleClick = () => setShow(!show)
    const setSloginPopFun = () => setSloginPop(true)
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
    const [fullNameError, setfullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [addressError, setaddressError] = useState("");
    const [ConfrimSignUpBtn, setConfrimSignUpBtn] = useState("")


    const handleInputChange = (index, value) => {
        const newPinValues = [...pinValues];
        newPinValues[index] = value;
        setPinValues(newPinValues);
        const otpValue = newPinValues.join('');
        setSignUp((prevData) => ({
            ...prevData,
            otp: otpValue // Update the otp property in SignUp state
        }));

    };
    const navigate = useNavigate()
    const toast = useToast();
    const defaultToastConfig = {
        duration: 2000,
        isClosable: true,
        position: 'top',
    };
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
        setPhoneNumberError('');
        setaddressError('')
        setfullNameError('')
    };

    const loginErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const SignUpvalidateForm = () => {
        clearErrors();

        let hasErrors = false;

        if (SignUp.fullName.trim() === "") {
            setfullNameError("Name cannot be empty")
        }

        if (SignUp.email.trim() === '') {
            setEmailError('Email cannot be empty');
            hasErrors = true;
        } else if (!validateEmail(SignUp.email)) {
            setEmailError('Please enter a valid email address.');
            hasErrors = true;
        }

        if (SignUp.password.trim() === '') {
            setPasswordError('Password cannot be empty');
            hasErrors = true;
        } else if (!validatePassword(SignUp.password)) {
            setPasswordError('Password must be at least 8 characters long.');
            hasErrors = true;
        }

        if (SignUp.mobile.trim() === '') {
            setPhoneNumberError('Phone number cannot be empty');
            hasErrors = true;
        } else if (!validatePhoneNumber(SignUp.mobile)) {
            setPhoneNumberError('Please enter a valid phone number.');
            hasErrors = true;
        }

        if (SignUp.address.trim() === "") {
            setaddressError("address cannot be empty")
        }

        return !hasErrors;
    };

    const LoginFormvalidation = () => {
        loginErrors()
        let hasLoginErrors = false;

        if (LogIn.email.trim() === '') {
            setEmailError('Email cannot be empty');
            hasLoginErrors = true;
        } else if (!validateEmail(LogIn.email)) {
            setEmailError('Please enter a valid email address.');
            hasLoginErrors = true;
        }

        if (LogIn.password.trim() === '') {
            setPasswordError('Password cannot be empty');
            hasLoginErrors = true;
        } else if (!validatePassword(LogIn.password)) {
            setPasswordError('Password must be at least 8 characters long.');
            hasLoginErrors = true;
        }

        return !hasLoginErrors;
    }


    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUp((prevData) => ({ ...prevData, [name]: value }));

        if (value.trim() !== '') {
            clearErrors();
        }
    };

    const openResetPasswordModal = () => {
        setResetPasswordModalOpen(true);
    };

    const handleLogInChange = (e) => {
        const { name, value } = e.target;
        setLogIn((prevData) => ({ ...prevData, [name]: value }));
        setAdminLogIn((prevData) => ({ ...prevData, [name]: value }));
        if (value.trim() !== '') {
            clearErrors();
        }
    };


    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (SignUpvalidateForm()) {
            try {
                const result = await post('user/send-top', { email: SignUp.email });
                if (result.status) {
                    toast({
                        title: 'Email Verification OTP went to email',
                        description: 'Please verify Email to complete Sign up',
                        status: 'success',
                        ...defaultToastConfig,
                    })

                }
                setResponse(result);
                setConfrimSignUpBtn(true)
                setShowPinInput(true);
            } catch (error) {
                toast({
                    title: 'Error in sending Email Verification OTP',
                    description: error?.response?.data?.message,
                    status: 'error',
                    ...defaultToastConfig,
                });
            }

        }

    };

    const confrimSignup = async (e) => {
        e.preventDefault()
        if (SignUpvalidateForm()) {
            try {
                const result = await post('user/signup', SignUp);
                if (result.success) {
                    toast({
                        title: 'Sign Up Successful',
                        description: 'You have successfully signed up.',
                        status: 'success',
                        ...defaultToastConfig,
                    });

                }
                setResponse(result);

            } catch (error) {
                toast({
                    title: 'Sign Up Error',
                    description: error?.response?.data?.message,
                    status: 'error',
                    ...defaultToastConfig,
                });
            }
        }
    }

    const handleLOginSubmit = async (e) => {

        e.preventDefault();



        if (LoginFormvalidation()) {
            try {
                const result = await post('user/login', LogIn);
                localStorage.setItem("userToken", result.token);
                localStorage.setItem("userId", result.id);

                setResponse(result);
                if (result.success) {
                    toast({
                        title: 'Login Successful',
                        description: 'You have successfully logged in.',
                        status: 'success',
                        ...defaultToastConfig,
                    });
                    window.location.reload()
                    sendDataToParent(true)
                    setIsModalOpen(false);
                }
            } catch (error) {
                console.log(error, "oihihih")
                toast({
                    title: 'Login Error',
                    description: error?.response?.data?.message,
                    status: 'error',
                    ...defaultToastConfig,
                });
            }
        }

    };

    const handleAdminLOginSubmit = async (e) => {

        e.preventDefault();
        if (LoginFormvalidation()) {
            try {
                const result = await post('admin/login', AdminLogIn);
                localStorage.setItem("adminToken", result.token);
                setResponse(result);
                if (result.status) {
                    toast({
                        title: 'Admin Login Successful',
                        description: 'You have successfully logged in.',
                        status: 'success',
                        ...defaultToastConfig,
                    })
                    setIsModalOpen(false);
                    navigate("/admin")
                }
                else {
                    toast({
                        title: 'Admin Login Error',
                        description: result.message,
                        status: 'error',
                        ...defaultToastConfig,
                    });
                }
            } catch (error) {
                console.log(error, "ojjpoj")

            }
        }
    }
    return (
        <div>


            <Modal isOpen={isModalOpen} onClose={onClick} size="x1">

                <ModalOverlay />
                <ModalContent>
                    {
                        adminLogin === true ? <ModalHeader>Admin Login</ModalHeader> : <ModalHeader>{loginPop ? "Login" : "Sign Up"}</ModalHeader>
                    }

                    <ModalCloseButton />



                    <div className="custom-flex">
                        <div className="img-wrap">
                            <img src={Loginiigg} alt="" />
                        </div>
                        {
                            loginPop ?
                                <div className="login-card">
                                    <div className="login-card-wrap">
                                        <label htmlFor="">Email</label>
                                        <Input placeholder='Email' size='md' name="email" onChange={(e) => {
                                            handleLogInChange(e);
                                        }} />
                                        <p className='custom-error'>{emailError}</p>
                                        <label htmlFor="">password</label>
                                        <InputGroup size='md'>

                                            <Input
                                                onChange={(e) => {
                                                    handleLogInChange(e);
                                                }}
                                                name="password"
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>

                                        </InputGroup>
                                        <p className='custom-error'>{passwordError}</p>
                                        <>

                                            <p className='forgetPasstext' onClick={openResetPasswordModal}>forget password</p>
                                            <div className="btn-wrap-pop-login">
                                                {
                                                    adminLogin === true ? <Button className='Login_as_Admin' onClick={handleAdminLOginSubmit}>Login as Admin</Button> :
                                                        <>
                                                            <Button className='login-btn' onClick={handleLOginSubmit}>Log in</Button>
                                                            <Button className='' onClick={(() => setSloginPop(false))}>Not a user Sign Up</Button>

                                                        </>
                                                }

                                            </div>
                                        </>


                                    </div>

                                    <div className="admin-login">
                                        <Button className='admin-login-btn' onClick={(() => setAdminLogin(true))}>Admin Log in</Button>
                                    </div>
                                </div> :


                                <div className="signup-card">
                                    <label htmlFor="">Full Name</label>
                                    <Input placeholder='Full Name' size='md' name="fullName" onChange={(e) => {
                                        handleSignUpChange(e);
                                    }} />
                                    <p className='custom-error'>{fullNameError}</p>
                                    <label htmlFor="">Email</label>
                                    <Input placeholder='Email' size='md' name="email" onChange={(e) => {
                                        handleSignUpChange(e);
                                    }} />
                                    <p className='custom-error'>{emailError}</p>

                                    <label htmlFor="">password</label>
                                    <InputGroup size='md'>

                                        <Input
                                            onChange={(e) => {
                                                handleSignUpChange(e);
                                            }}
                                            name="password"
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Enter password'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <p className='custom-error'>{passwordError}</p>
                                    <label htmlFor="">phone number</label>
                                    <InputGroup>

                                        <InputLeftAddon children='+1' />
                                        <Input type='tel' placeholder='phone number' name="mobile" onChange={(e) => {
                                            handleSignUpChange(e);
                                        }} />

                                    </InputGroup>
                                    <p className='custom-error'>{phoneNumberError}</p>
                                    <label htmlFor="">Address</label>
                                    <Input placeholder='Address' size='md' name="address" onChange={(e) => {
                                        handleSignUpChange(e);
                                    }} />
                                    <p className='custom-error'>{addressError}</p>

                                    {showPinInput ?

                                        <div className='verifyEmail-warp'>
                                            <PinInput size="lg" onComplete={(value) => console.log('Completed:', value)}>
                                                {pinValues.map((value, index) => (
                                                    <PinInputField
                                                        key={index}
                                                        value={value}
                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                        isInvalid={index >= 6}
                                                    />
                                                ))}
                                            </PinInput>
                                        </div> : ""

                                    }

                                    <div className="btn-wrap-pop">
                                        {
                                            ConfrimSignUpBtn ? <Button className='signUpBtn' onClick={confrimSignup}>Confrim Sign Up</Button> : <Button className='signUpBtn' onClick={handleSignUpSubmit}>Sign Up</Button>
                                        }
                                        <Button className='Backtologin' onClick={setSloginPopFun}>Back to Login</Button>
                                    </div>
                                </div>
                        }


                    </div>






                </ModalContent>

            </Modal>

            {resetPasswordModalOpen && (
                <PasswordResetModal
                    isOpen={resetPasswordModalOpen}
                    onClose={() => setResetPasswordModalOpen(false)}
                />
            )}
        </div>
    )
}

export default LoginSignUp