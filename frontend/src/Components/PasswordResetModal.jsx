import React, { useState } from 'react';
import { post } from '../api/ApiService';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import "./passwordStyle.css"

const ResetDetails = {

  email: "",
  password: "",
  otp: ""
};


const PasswordResetModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');;
  const [Reset, setReset] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const [hideEmail, SetHideEmail] = useState(true);
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const toast = useToast();
  const [pinValues, setPinValues] = useState(['', '', '', '', '', '']);
  const handleClick = () => setShow(!show);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const defaultToastConfig = {
    duration: 2000,
    isClosable: true,
    position: 'top',
  };
  const handleInputChange = (index, value) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
    const otpValue = newPinValues.join('');
    setReset(otpValue)

  };


  const validatePassword = () => {
    // Implement your password validation logic here
    // For example, requiring a minimum length of 8 characters
    if (password.length < 8) {
      setPasswordError(true); // Set error flag
    } else {
      setPasswordError(false); // Clear error flag if valid
    }
  };

  const handleSendEmail = async () => {
    if (validateEmail(email)) {
      setEmailValid(true);
      SetHideEmail(false);
      try {
        // Make a POST request to your API with the item data
        const result = await post('user/forgot-password', { email: email },);
        if (result.status) {


          // Display a success message
          toast({
            title: "Reset Token was send to mail Successfully",
            status: "success",
            ...defaultToastConfig
          });
        }
      } catch (error) {
        console.log(error, "oihihih")
        toast({
          title: ' Error in sending reset token to mail',
          description: error?.response?.data?.message,
          status: 'error',
          ...defaultToastConfig,
        });
      }
    } else {
      // Email is invalid, show error
      setEmailError(true);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    // Check if the new confirmation matches the password
    if (newConfirmPassword !== password) {
      setPasswordError(true); // Set error flag if they don't match
    } else {
      setPasswordError(false); // Clear error flag if they match
    }
  };

  const handleUpdatePassword = async () => {
    // Validate the password
    validatePassword();

    // Check if there are any errors
    if (!passwordError) {
      try {
        // Make a POST request to your API with the item data
        const result = await post('user/reset-password', {
          email: email,
          resetToken: Reset,
          newPassword: password
        },);
        if (result.status) {


          // Display a success message
          toast({
            title: "Password Reset Successfully",
            status: "success",
            ...defaultToastConfig
          });
          onClose();
        }
      } catch (error) {
        toast({
          title: ' Error in changing Password',
          description: error?.response?.data?.message,
          status: 'error',
          ...defaultToastConfig,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="x1">
      <ModalOverlay />

      <ModalContent padding="24px">
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {hideEmail && (
            <FormControl marginBottom="16px">
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={emailError}
              />
              <FormHelperText>
                Enter your email address to receive a PIN.
              </FormHelperText>

              <Button onClick={handleSendEmail}>Send Email</Button>
              {emailError && (
                <FormHelperText color="red">
                  Please enter a valid email address.
                </FormHelperText>
              )}
            </FormControl>
          )}
          {isEmailValid && (
            <>
              <FormControl fullWidth>
                <FormLabel>Enter the PIN received in your email.</FormLabel>
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
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>New Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    value={password}
                    onChange={handlePasswordChange}
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

              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={validatePassword}
                  isInvalid={passwordError}
                />
                {passwordError && (
                  <FormHelperText color="red">
                    Password should match and should have 8 characters.
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                marginTop="16px"
                colorScheme="blue"
                onClick={handleUpdatePassword}
              >
                Update Password
              </Button>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PasswordResetModal;
