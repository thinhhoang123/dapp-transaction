import { Button, Grid } from '@mui/material';
import * as React from 'react';
import CardETH from './CardETH';
import FormSendETH from './FormSendETH';
import ETHLoader from './ETHLoader';
import { TransactionContext } from '../context/TransactionContext';

export interface IHeroSectionProps {}

export default function HeroSection(props: IHeroSectionProps) {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
  } = React.useContext(TransactionContext);

  const handleSubmit = async (data: any) => {
    console.log(data);
    await sendTransaction(data.address, data.amount, data.message);
  };
  console.log(currentAccount);
  return (
    <section>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: '10em' }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <h1>What is Ethereum?</h1>
          <p>
            <i className="fad fa-quote-left"></i> Ethereum is a technology
            that's home to digital money, global payments, and applications. The
            community has built a booming digital economy, bold new ways for
            creators to earn online, and so much more. It's open to everyone,
            wherever you are in the world – all you need is the internet.
          </p>
          {currentAccount ? null : (
            <Button
              startIcon={<i className="fad fa-wallet"></i>}
              variant="contained"
              sx={{ margin: '1em 0' }}
              onClick={connectWallet}
            >
              connect wallet
            </Button>
          )}
          <CardETH />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5em',
          }}
        >
          <ETHLoader />
          <FormSendETH submit={handleSubmit} />
        </Grid>
      </Grid>
    </section>
  );
}
