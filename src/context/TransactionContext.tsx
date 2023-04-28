import React, { createContext, useEffect, useState } from 'react';

import { contractABI, contractAddress } from '../utils/constants';
import { ethers, formatUnits, parseEther, toBeHex, toNumber } from 'ethers';
export const TransactionContext = createContext<any>(null);

const { ethereum } = window;

const getSigner = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  return await provider.getSigner();
};

const createEthereumContract = async () => {
  const signer = await getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionsContract;
};

export interface ITransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsProvider: React.FC<ITransactionsProviderProps> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();
        const structuredTransactions = availableTransactions.map(
          (transaction: any) => {
            return {
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(
                toNumber(transaction.timestamp) * 1000
              ).toLocaleString(),
              message: transaction.message,
              amount: formatUnits(transaction.amount, 18),
            };
          }
        );
        setTransactions(structuredTransactions);
      } else {
        console.log('Ethereum is not present');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          'transactionCount',
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const signer = await getSigner();
      const address = signer.getAddress();
      setCurrentAccount(address);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  window.ethereum.on('accountsChanged', function (accounts: any) {
    console.log('accountsChanges', accounts);
    window.location.reload();
  });

  const sendTransaction = async (
    addressTo: string,
    amount: string,
    message: string
  ) => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const parsedAmountHex = toBeHex(parseEther(amount));
        const signer = await getSigner();

        const tx = await signer.sendTransaction({
          from: currentAccount,
          to: addressTo,
          value: parsedAmountHex,
        });

        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmountHex,
          message
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await tx.wait();
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount =
          await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log('No ethereum object');
      }
      ethereum.on('Transfer', (to: any, amount: any, from: any) => {
        console.log(to, amount, from);
      });
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
