import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { MY_FULL_NAME } from '~/constants';
import { makeOfferRequest } from '~/api';

type OfferProps = {
  onClose: () => void;
};

export const Offer = ({ onClose }: OfferProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [company, setCompany] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [contact, setContact] = React.useState<string | null>(null);
  const [salaryRange, setSalaryRange] = React.useState<string | null>(null);
  const [desc, setDesc] = React.useState<string | null>(null);

  const [isSendingOffer, setIsSendingOffer] = React.useState(false);

  const onSendOfferHandler = async () => {
    if (!company || !name || !contact || !salaryRange || !desc) {
      return;
    }

    try {
      setIsSendingOffer(true);

      await makeOfferRequest({ company, name, contact, salaryRange, desc });

      onClose();
    } finally {
      setIsSendingOffer(false);
    }
  };

  return (
    <Dialog fullScreen={fullScreen} onClose={onClose} open>
      <DialogTitle>Make Offer For {MY_FULL_NAME}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          To make offer please fill all required fields. I will send you a response to your contact
          address.
        </DialogContentText>

        <TextField
          margin="dense"
          id="company"
          label="Company"
          variant="standard"
          value={company || ''}
          onChange={e => setCompany(e.target.value)}
          error={company === ''}
          autoFocus
          fullWidth
        />

        <TextField
          margin="dense"
          id="name"
          label="Name"
          variant="standard"
          value={name || ''}
          onChange={e => setName(e.target.value)}
          error={name === ''}
          fullWidth
        />

        <TextField
          margin="dense"
          id="contact"
          label="Contact"
          variant="standard"
          value={contact || ''}
          onChange={e => setContact(e.target.value)}
          error={contact === ''}
          fullWidth
        />

        <TextField
          margin="dense"
          id="salaryRange"
          label="Salary Range"
          variant="standard"
          value={salaryRange || ''}
          onChange={e => setSalaryRange(e.target.value)}
          error={salaryRange === ''}
          fullWidth
        />

        <TextField
          margin="dense"
          id="desc"
          label="Description"
          variant="standard"
          value={desc || ''}
          onChange={e => setDesc(e.target.value)}
          error={desc === ''}
          rows={10}
          multiline
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <LoadingButton
          /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
          onClick={onSendOfferHandler}
          disabled={!company || !name || !contact || !salaryRange || !desc}
          loading={isSendingOffer}
        >
          Send
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
