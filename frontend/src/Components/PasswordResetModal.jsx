import React, { useState } from 'react';
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
  InputRightElement
} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import "./passwordStyle.css"
const PasswordResetModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
const [ hideEmail , SetHideEmail] = useState(true)
const [show, setShow] = React.useState(false)

const handleClick = () => setShow(!show)
  const validateEmail = () => {
    // Implement your email validation logic here
    // Set isEmailValid to true if the email is valid, otherwise false
  };

  const validatePin = () => {
    // Implement your PIN validation logic here
    // Set isPinValid to true if the PIN is valid, otherwise false
  };

  const validatePassword = () => {
    // Implement your password validation logic here
    // Set isPasswordValid to true if the password is valid, otherwise false
  };

  const handleSendEmail = () => {
    setEmailValid(true);
    SetHideEmail(false)
  };

  const handleUpdatePassword = () => {
    // Implement your logic to update the password
    // You can use the 'password' state for the new password
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="x1">
      <ModalOverlay />
   
      <ModalContent padding="24px">
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
      {
        hideEmail && (    <FormControl marginBottom="16px">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
        />
        <FormHelperText>
          Enter your email address to receive a PIN.
        </FormHelperText>

        <Button onClick={handleSendEmail}>Send Email</Button>
      </FormControl>)
      }
          {isEmailValid && (
            <>
           
                <FormControl fullWidth>
                  <FormLabel>Enter the PIN received in your email.</FormLabel>
                  <PinInput type="alphanumeric" mask>
                    <PinInputField
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      onBlur={validatePin}
                    />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
       
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel>New Password</FormLabel>
                  {/* <Input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                  /> */}

<InputGroup size='md'>

<Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validatePassword}
                  />
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
