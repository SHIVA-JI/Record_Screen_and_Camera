
import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';

const Confirmation = () => {
    const [isScreenCam,setIsScreenCam] = useState(false);

    const handleScreen = ()   => {
        if(isScreenCam) {
            setIsScreenCam(false);
        }
        else{
            setIsScreenCam(true);
        }
    }
   
  return (
        <div id='confirmation'>
            <h3>Confirm, what you want to record ?</h3>
            <label htmlFor="isScreenCam">Screen and WebCam: </label>
            <input
                type='checkbox'
                name='isScreenCam'
                onChange={handleScreen}
            />
            {isScreenCam && <div> <NavLink to='/recorderPage'> 
                <button className='btn'>Continue</button>
            </NavLink></div>}
        
        </div>
    )
}

export  default Confirmation;


