import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import {Etherscan} from "../Context/Ether";
import Style from "../styles/account.module.css";
import etherLogo from "../ethlogo.jpg";
import loader from "../loading.gif";
import Table from "../components/Table";

function account() {
  return <div>account</div>;
}

export default account;
