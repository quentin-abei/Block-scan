import React from "react";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Style from "../styles/navbar.module.css";
import etherlogo from "../ethlogo.jpg";
import logo from "../blocklogo.png";
import avatar from "../pngegg.png";
import logoTop from "../logopng.png";
import { MdOutlineClose } from "react-icons/md";
import { TbChartArrowsVertical } from "react-icons/tb";

const Navbar = () => {
  /**
   * @dev  #setUserAccount tracks the current user account
   * @dev #setBalance tracks the user balance
   * @dev #setCount tracks the number of transaction of an account
   * @dev #setOpenModel open and close the box upon a click event
   * @dev #setPrice of eth
   * @dev #setEtherSupply supply of ether
   * @dev
   */
  const [userAccount, setUserAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [count, setCount] = useState("");
  const [openModel, setOpenModel] = useState(true);
  const [price, setPrice] = useState([]);
  const [etherSupply, setEtherSupply] = useState([]);
  const [updatedPriceDate, setUpdatedPriceDate] = useState("");

  /**
   * @dev openUserInfo()
   */
  const openUserInfo = () => {
    if (openModel) {
      setOpenModel(false);
    } else if (!openModel) {
      setOpenModel(true);
    }
  };

  /**
   * @dev getEtherPrice() update eth price in real time
   */
  const getEtherPrice = async () => {
    try {
      const ETHERSCAN_API = "4PB7EUMA6XC16V91XE1J6MVTZQUDMW3T57";
      await axios
        .get(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API}`
        )
        .then((response) => {
          setPrice(response.data.result);
          //console.log(response.data.result);
          //console.log(price);
          const timestamp = Number(response.data.result.ethusd_timestamp);
          //console.log(timestamp);

          const date = new Date(timestamp);
          setUpdatedPriceDate(
            "Update:" +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds()
          );
        });
      //console.log(updatedPriceDate);
      await axios
        .get(
          `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${ETHERSCAN_API}`
        )
        .then((response) => {
          setEtherSupply(response.data.result);
        });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @dev let's connect to metamask
   */
  const chekIfAccountExist = async () => {
    try {
      if (!window.ethereum) return console.log("Please install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setUserAccount(accounts[0]);
      }
      //console.log(userAccount);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @dev connectWallet on button click
   */
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Please install metamask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setUserAccount(accounts[0]);
      } else {
        console.log("No account");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * @dev call this function everytime the page is refreshed
   */
  useEffect(() => {
    chekIfAccountExist();
    getEtherPrice();
  }, []);
  return (
    <div>
      <div className={Style.navbar}>
        <div className={Style.navbar_container}>
          <div className={Style.left}>
            <Link href="/">
              <div>
                <h1 className={Style.desktop}>Block Scan</h1>
                <h1 className={Style.mobile}>
                  <Image src={logoTop} alt="logo" width={50} height={50} />
                </h1>
              </div>
            </Link>
          </div>
          <div className={Style.right}>
            {userAccount.length ? (
              <div className={Style.connected}>
                <button onClick={() => openUserInfo()}>
                  Acc: {userAccount.slice(0, 10)}...
                </button>
                {openModel ? (
                  <div className={Style.userModel}>
                    <div className={Style.userBox}>
                      <div className={Style.closeBtn}>
                        <MdOutlineClose onClick={() => openUserInfo()} />
                      </div>
                      <Image src={avatar} alt="user" width={50} height={50} />
                      <p>Acc: &nbsp; {userAccount} ETH</p>
                      <p>Balance: &nbsp; {balance} ETH</p>
                      <p>Total Transaction: &nbsp; count ETH</p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <button onClick={() => connectWallet()}>Connect Wallet</button>
            )}
          </div>
        </div>
      </div>
      <div className={Style.price}>
        <div className={Style.priceBox}>
          <div className={Style.etherPrice}>
            <div>
              <Image src={etherlogo} alt="ether logo" width={30} height={30} />
            </div>
            <div>
              <h4>Ether Price</h4>
              <p>$ 1000</p>
              <p>BTC 1000</p>
              <p>Updated Price</p>
            </div>
          </div>

          <div className={Style.supplyEther}>
            <div>
              <TbChartArrowsVertical className={Style.supplyIcon} />
            </div>

            <div>
              <h4>Total Ether Supply</h4>
              <p>$ 1000</p>
              <p>BTC 1000</p>
              <p>Updated Price</p>
            </div>
          </div>
        </div>

        <div className={Style.priceBox}>
          <div className={Style.tokenBoxLogo}>
            <Image src={logo} alt="logo" width={200} height={200}/>
          </div>

          <div className={Style.logoWidth}>
            <p>ERC20 Token</p>
            <p>ERC721 Token</p>
            <p>ERC1155 Token</p>
            <p>Contract</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
