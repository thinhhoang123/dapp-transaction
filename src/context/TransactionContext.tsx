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
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const [transactions, setTransactions] = useState([]);
  const [fundReceived, setFundReceived] = useState();
  const [balance, setBalance] = useState<any>();

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

        await getAllTransactions();
        await getFundReceived();
        await getBalance();

        window.ethereum.on('accountsChanged', function (accounts: any) {
          console.log('accountsChanges', accounts);
          window.location.reload();
        });
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

  const clearFund = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const tx = await transactionsContract.clearFund();
        await tx.wait();
        window.location.reload();
      } else {
        console.log('No ethereum object');
      }
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  const sendTransaction = async (amount: string, message: string) => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const parsedAmountHex = toBeHex(parseEther(amount));
        const signer = await getSigner();

        const tx = await signer.sendTransaction({
          from: currentAccount,
          to: contractAddress,
          value: parsedAmountHex,
        });

        const transactionHash = await transactionsContract.addToBlockchain(
          parsedAmountHex,
          message
        );

        await tx.wait();
        await transactionHash.wait();
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

  const submitFundReceived = async (fundReceived: string, goal: string) => {
    const parsedAmountHex = toBeHex(parseEther(goal));
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        console.log(fundReceived);
        const tx = await transactionsContract.setFund(
          fundReceived,
          parsedAmountHex
        );
        await tx.wait();
        window.location.reload();
      } else {
        console.log('No ethereum object');
      }
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  const getFundReceived = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const fundReceived = await transactionsContract.getFundReceiver();
        const fundReceivedObject: any = {
          addressReceived: fundReceived[0].startsWith('0x000')
            ? 0
            : fundReceived[0],
          goal: formatUnits(fundReceived[1], 18),
        };
        setFundReceived(fundReceivedObject);
        // window.location.reload();
      } else {
        console.log('No ethereum object');
      }
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  const getBalance = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const getBalanceSC = await transactionsContract.getBalance();
        setBalance(formatUnits(getBalanceSC, 18));
      } else {
        console.log('No ethereum object');
      }
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
        sendTransaction,
        clearFund,
        fundReceived,
        balance,
        submitFundReceived,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
