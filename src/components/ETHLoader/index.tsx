import * as React from 'react';
import styles from './index.module.scss';
export interface IETHLoaderProps {}

export default function ETHLoader(props: IETHLoaderProps) {
  return (
    <div className={styles['loader']}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles['logo']}
        width="200"
        height="200"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {' '}
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />{' '}
        <path d="M6 12l6 -9l6 9l-6 9z" /> <path d="M6 12l6 -3l6 3l-6 2z" />{' '}
      </svg>
    </div>
  );
}
