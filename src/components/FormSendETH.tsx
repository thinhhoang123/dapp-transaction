import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

interface IDefaultValue {
  address: string;
  amount: string;
  message: string;
}
const defaultValues: IDefaultValue = {
  address: '',
  amount: '',
  message: '',
};

export interface IFrormProps {
  submit: (data: IDefaultValue) => void;
}
const Form: React.FC<IFrormProps> = (props) => {
  const [formValues, setFormValues] = useState<IDefaultValue>(defaultValues);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    e.preventDefault();

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.submit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-sending-ETH">
        <TextField
          id="address-input"
          name="address"
          label="Address to 👉"
          type="text"
          value={formValues.address}
          onChange={handleInputChange}
        />

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
  );
};
export default Form;
