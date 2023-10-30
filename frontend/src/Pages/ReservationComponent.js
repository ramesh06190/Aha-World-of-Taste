import React from 'react'
import { Button, Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
function ReservationComponent() {
    return (
        <div>    <div className="reservation-section">
            <h1>Reserve a Table</h1>
            <h4>To help us find the best table for you, select the preferred party size, date, and time of your reservation.</h4>
            <div className="reserve-input-wrap">
                < div className='label-wrap'>
                    <p>Party Size</p>
                    <Select placeholder='Select option' focusBorderColor='black' borderRadius="2px">
                        <option value='option1'>Guest 1</option>
                        <option value='option2'>Guest 2</option>
                        <option value='option3'>Guest 3</option>
                    </Select>
                </div>
                < div className='label-wrap'>
                    <p>Date</p>
                    <Input
                        focusBorderColor='black' borderRadius="2px"
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                    />
                </div>
                <div className='label-wrap'>
                    <p>Time</p>
                    <Select placeholder=' Select your comfortable Time' focusBorderColor='black' borderRadius="2px">
                        <option value='option1'>Time 1</option>
                        <option value='option2'>Time 2</option>
                        <option value='option3'>Time 3</option>
                    </Select>
                </div>
                <div className="label-wrap-btn">
                    <div>
                        <Button borderRadius="2px" colorScheme='gray' >Find A Table</Button>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default ReservationComponent