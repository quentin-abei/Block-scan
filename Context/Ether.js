import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/tyUvCBwNRzB8Q3jEDJZzEXlvuPas80ks`
);

export const Etherscan = React.createContext();
export const EtherProvider = ({ children }) => {
  const tenBlockWithDetails = [];
  const [yourBlockTransaction, setYourBlockTransaction] =
    useState(tenBlockWithDetails);
  const [currentBlock, setCurrentBlock] = useState([]);
  const [topTenBlock, setTopTenBlock] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [gasPrice, setGasPrice] = useState("");

  const accountDetails = async () => {
    try {
      const getCurrentBlock = await provider.getBlockNumber();
      setCurrentBlock(getCurrentBlock);
      //console.log(getCurrentBlock);

      const blockTransaction = await provider.getBlock(getCurrentBlock);
      setTransaction(blockTransaction.transactions);

      const previousBlock = getCurrentBlock - 10;
      const listTenBlock = [];

      for (let i = getCurrentBlock; i > previousBlock; i--) {
        listTenBlock.push([i]);
      }

      //console.log(listTenBlock);

      const getBlockDetails = listTenBlock.flat();
      setTopTenBlock(getBlockDetails);
      //console.log(getBlockDetails);

      getBlockDetails.map(async (el) => {
        const singleBlockData = await provider.getBlock(el);
        tenBlockWithDetails.push(singleBlockData);
        //console.log(singleBlockData);
      });

      const gasPrice = await provider.getGasPrice();
      const latestGasPrice = ethers.utils.formatUnits(gasPrice);
      setGasPrice(latestGasPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    accountDetails();
  }, []);

  return (
    <Etherscan.Provider
      value={{
        currentBlock,
        topTenBlock,
        yourBlockTransaction,
        transaction,
        gasPrice,
        provider,
      }}
    >
      {children}
    </Etherscan.Provider>
  );
};
