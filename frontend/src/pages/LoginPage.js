import './loginPage.scss';
import React, { useState } from 'react';
import { useEffect } from 'react';
import LoginSection from './LoginSection';
import backGroundPhoneFrame from '../asset/Phone.png';
import Shoe1 from '../asset/shoe1.mp4';
import Shoe2 from '../asset/shoe2.mp4';

const LoginPage = (props) => {
  const [ShoeVideos, setShoeVideos] = useState([Shoe1, Shoe2]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="LoginPage">
      <div className='content'>
        <div className="title">Welcome to the E-COMERCE</div>
        <div className='LoginZone'>
          <span className='LoginBox'><LoginSection/></span>
          <div className="PhoneDisplay"> 
            <span className='backgroundPhone'><img src={backGroundPhoneFrame} alt="backgroundPhoneFrame" /></span>
            <span className='ShoeVideos'>
              {ShoeVideos.map((video, index) => (
                <video
                  key={index}
                  src={video}
                  className={index === activeIndex ? 'active' : ''}
                  autoPlay
                  muted
                  loop
                />
              ))}
            </span>
          </div>      
        </div>
        <div className='founder'>A PRODUCT OF HUYNH NGUYEN SON'S TEAM</div>
      </div>
    </div>
  );
}

export default LoginPage;
