import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

interface IDefaultValue {
  amount: string;
  message: string;
  fundReceived: string;
  goal: string;
}
const defaultValues: IDefaultValue = {
  amount: '',
  message: '',
  fundReceived: '',
  goal: '',
};

export interface IFrormProps {
  submit: (data: IDefaultValue) => void;
  submitFund: (data: IDefaultValue) => void;
}

const Form: React.FC<IFrormProps> = (props) => {
  const { fundReceived, balance, clearFund } =
    React.useContext(TransactionContext);
  const [formValues, setFormValues] = useState<IDefaultValue>(defaultValues);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.submit(formValues);
  };

  const handleSubmitFund = async (event: any) => {
    event.preventDefault();
    props.submitFund(formValues);
  };

  const handleClear = async () => {
    await clearFund();
  };

  return (
    <>
      <form onSubmit={handleSubmitFund}>
        <div className="form-sending-ETH">
          {fundReceived?.addressReceived ? (
            <div>Address: {fundReceived.addressReceived}</div>
          ) : (
            <TextField
              id="fund-input"
              name="fundReceived"
              label="Address will received the fund 💵"
              type="text"
              value={formValues.fundReceived}
              onChange={handleInputChange}
            />
          )}

          {fundReceived?.goal && !fundReceived?.goal.startsWith('0.0') ? (
            <div>
              Goal: {fundReceived.goal} <i className="fab fa-ethereum"></i>
            </div>
          ) : (
            <TextField
              id="max-fund-input"
              name="goal"
              label="Goal 💰"
              type="text"
              value={formValues.goal}
              onChange={handleInputChange}
            />
          )}
          {fundReceived?.addressReceived ? (
            <div>
              Total: {balance} <i className="fab fa-ethereum"></i>
            </div>
          ) : null}
          {fundReceived?.addressReceived ? (
            <Button variant="contained" color="error" onClick={handleClear}>
              Clear
            </Button>
          ) : (
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
      <form onSubmit={handleSubmit}>
        <div className="form-sending-ETH">
          <TextField
            id="amount-input"
            name="amount"
            label="Amount ETH 💲"
            type="number"
            value={formValues.amount}
            onChange={handleInputChange}
          />

          <TextField
            id="message-input"
            name="message"
            label="Message 💌"
            type="text"
            value={formValues.message}
            onChange={handleInputChange}
          />

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
export default Form;
