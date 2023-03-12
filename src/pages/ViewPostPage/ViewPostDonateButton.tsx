import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { AttachMoney as AttachMoneyIcon } from '@mui/icons-material';

import { getMyProfileContractAddress, sentEthTransaction } from '~/helpers';
import { useUser } from '~/providers';

export const ViewPostDonateButton = () => {
  const { ethAccount } = useUser();

  const [isDonate, setIsDonate] = useState(false);
  const [donateEth, setDonateEth] = useState('0.001');

  if (!ethAccount) {
    return null;
  }

  const donate = async () => {
    try {
      await sentEthTransaction(ethAccount, getMyProfileContractAddress(), donateEth);

      setIsDonate(false);

      toast('Thank you so much for donating!', { type: 'success' });
    } catch (e) {
      toast('Something went wrong', { type: 'error' });
    }
  };

  return (
    <>
      <Button onClick={() => setIsDonate(true)} startIcon={<AttachMoneyIcon />} variant="outlined">
        Donate ETH
      </Button>

      <Dialog open={isDonate} onClose={() => setIsDonate(false)}>
        <DialogTitle>Donate ETH</DialogTitle>

        <DialogContent>
          <TextField
            value={donateEth}
            onChange={e => setDonateEth(e.target.value)}
            variant="standard"
            label="ETH"
            autoFocus
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={donate} disabled={!donateEth}>
            Donate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
