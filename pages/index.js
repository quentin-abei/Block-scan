import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ethers } from "ethers";
import Link from "next/link";
import { SiMinutemailer } from "react-icons/si";

import Style from "../styles/index.module.css";
import { Etherscan } from "../Context/Ether";
import etherLogo from "../ethlogo.jpg";
const index = () => {
  const router = useRouter();
  const { yourBlockTransaction, transaction } = useContext(Etherscan);

  const [userAccount, setUserAccount] = useState("");
  const convertIntoETH = (amount) => {
    const ETH = ethers.utils.formatUnits(amount, "ether");
    return ETH;
  };

  const accountAddress = (event) => {
    event.preventDefault();
    const address = document.getElementById("accountAddress").value.trim();
    setUserAccount(address);
    router.push(`/account?${address}`);
    
  };
  console.log(yourBlockTransaction);
  return (
    <div>
      <div className={Style.header}>
        <form className={Style.accountAddress}>
          <input
            type="text"
            placeholder="Metamask account address"
            id="accountAddress"
          />
          <Link
            href={{ pathname: "/account", query: userAccount }}
            legacyBehavior
          >
            <a onClick={(event) => accountAddress(event)}>
              <SiMinutemailer />
            </a>
          </Link>
        </form>
      </div>

      <div className={Style.container}>
        <div className={Style.containerBox}>
          <h3>Latest Blocks</h3>
          <div className={Style.containerBlock}>
            {yourBlockTransaction.map((el, i) => {
              return (
                <div className={Style.oneBlock} key={`${el.number}_${el.timestamp}_${el.miner}_${el.baseFeePerGas}`}>
                  <div className={Style.block}>
                    <div className={Style.info}>
                      <p className={Style.bk}>BK</p>
                      <Link href={{ pathname: "/block", query: el.number }}>
                        {el.number}
                      </Link>
                    </div>
                    <p>{el.timestamp}</p>
                  </div>
                  <div>
                    <div className={Style.miner}>
                      <p>
                        <span>
                          Miner: &nbsp;&nbsp;
                          <Link
                            className={Style.link}
                            href={{ pathname: "/account/", query: el.miner }}
                            legacyBehavior
                          >
                            <a>{el.miner.slice(0, 35)}...</a>
                          </Link>
                        </span>
                      </p>
                      <span>
                        <Link
                          href={{ pathname: "/account", query: el.number }}
                          legacyBehavior
                        >
                          <a>{el.transactions.length}</a>
                        </Link>
                        &nbsp; TNS in 3sec
                      </span>
                    </div>

                    <div className={Style.reward}>
                      <p>
                        {convertIntoETH(el.baseFeePerGas)}
                        <span>ETH</span>
                      </p>
                      <Image
                        src={etherLogo}
                        className={Style.eth}
                        alt="Ether logo"
                        width={10}
                        height={10}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={Style.containerBox}>
              <h3>Latest transactions</h3>
              <div className={Style.containerBlock}>
                {transaction.map((el, i) =>{
                  return(
                    <div className={Style.oneBlock} key={i + 1}>
                       <div className={Style.info}>
                          <div>
                            <p className={Style.bx}>TS</p>
                          </div>
                          <Link href={{pathname: "/transaction", query: el}} legacyBehavior>
                             <a>Hash: &nbsp; {el.slice(0, 45)}...</a>
                          </Link>
                       </div>
                    </div>
                  );
                })}
              </div>
        </div>
      </div>
    </div>
  );
};

export default index;
