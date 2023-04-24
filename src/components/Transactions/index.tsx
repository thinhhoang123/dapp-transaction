import * as React from 'react';
import TransactionsCard from './TransactionsCard';
import dummyData from '../../utils/dummyData';
import styles from './index.module.scss';
import { TransactionContext } from '../../context/TransactionContext';
export interface ITransactionsProps {}

export default function Transactions(props: ITransactionsProps) {
  const { transactions, transactionCount } =
    React.useContext(TransactionContext);
  return (
    <section>
      <h1 style={{ textAlign: 'center' }}>
        Connect your account to see the latest transactions👏
      </h1>
      <div className={styles['transactions-list']}>
        {transactions
          ? transactions.map((x: any, index: number) => {
              return <TransactionsCard key={index} {...x} />;
            })
          : null}
      </div>
    </section>
  );
}
