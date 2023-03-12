import React from 'react';
import { toast } from 'react-toastify';
import { useHoneyForm } from '@tynik/react-honey-form';
import { Button, Grid, TextField } from '@mui/material';

import { Restore as RestoreIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import type { PostCID } from '~/types';

import { useUser } from '~/providers';
import { restorePost } from '~/helpers';

type RestorePostForm = {
  cid: PostCID;
  slug: string;
  created: number;
};

export const RestorePostPage = () => {
  const navigate = useNavigate();
  const user = useUser();

  const { formFields, submit } = useHoneyForm<RestorePostForm>({
    fields: {
      cid: {
        required: true,
        value: '',
      },
      slug: {
        required: true,
        max: 250,
        value: '',
      },
      created: {
        type: 'number',
        required: true,
        value: '' as never,
      },
    },
  });

  const submitHandler = async (data: RestorePostForm) => {
    if (!user.ethAccount) {
      return;
    }

    try {
      await restorePost({
        cid: data.cid,
        slug: data.slug,
        created: data.created,
        ethAccount: user.ethAccount,
      });

      toast('Successfully restored', { type: 'success' });

      navigate('/drafts');
    } catch (e) {
      toast('Something went wrong', { type: 'error' });
    }
  };

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <TextField
          label="CID"
          {...formFields.cid.props}
          error={formFields.cid.errors.length > 0}
          fullWidth
        />
      </Grid>

      <Grid xs={12} item>
        <TextField
          label="Slug"
          {...formFields.slug.props}
          error={formFields.slug.errors.length > 0}
          fullWidth
        />
      </Grid>

      <Grid xs={12} item>
        <TextField
          label="Created"
          {...formFields.created.props}
          error={formFields.created.errors.length > 0}
          fullWidth
        />
      </Grid>

      <Grid xs={12} textAlign="right" item>
        <Button
          onClick={() => submit(submitHandler)}
          startIcon={<RestoreIcon />}
          variant="outlined"
          color="success"
        >
          Restore
        </Button>
      </Grid>
    </Grid>
  );
};
