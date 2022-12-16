import React from 'react'
import Image from 'next/image';
import {RiSendPlane2Fill} from "react-icons/ri";
import {TiSocialTwitter} from "react-icons/ti";
import {AiFillLinkedin} from "react-icons/ai";
import {AiFillGithub} from "react-icons/ai";

import Style from "../styles/footer.module.css";
import FooterLogo from "../blocklogo.png";
const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footerBox}>
        <Image src={FooterLogo} alt="logo" width={100} height={100}/>
      </div>

      <div className={Style.footerBox}>
        <div className={Style.footerInput}>
          <input type="email" placeholder="Send me an email"/>
          <RiSendPlane2Fill />
        </div>
      </div>

      <div className={Style.footerBox}>
         <div className={Style.social}>
            <TiSocialTwitter />
            <AiFillGithub />
            <AiFillLinkedin />
            
         </div>
      </div>
    </div>
  )
}

export default Footer