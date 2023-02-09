import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useHoneyForm } from '@tynik/react-honey-form';

export type ImageSettingsForm = {
  width: string;
  height: string;
};

export type ImageAttributes = {
  src: string;
  width?: string;
  height?: string;
};

type ImageProps = ImageAttributes & {
  setEditorReadOnly: (state: boolean) => void;
  onUpdate: (data: Partial<ImageAttributes>) => void;
};

export const Image = ({
  src,
  setEditorReadOnly,
  onUpdate,
  width = '100%',
  height = '100%',
}: ImageProps) => {
  const [isShowSettings, setIsShowSettings] = useState(false);

  const [imageSettings, setImageSettings] = useState<ImageSettingsForm>({
    width,
    height,
  });

  const { formFields, submit } = useHoneyForm<ImageSettingsForm>({
    fields: {
      width: {
        value: imageSettings.width,
      },
      height: {
        value: imageSettings.height,
      },
    },
    onSubmit: data => {
      setImageSettings(data);

      onUpdate(data);

      return Promise.resolve();
    },
  });

  useEffect(() => {
    setEditorReadOnly(isShowSettings);
  }, [isShowSettings]);

  const openSettings = () => {
    setIsShowSettings(true);
  };

  const applySettings = () => {
    submit()
      .then(() => {
        setIsShowSettings(false);
      })
      .catch(() => {});
  };

  const closeSettings = () => {
    setIsShowSettings(false);
  };

  return (
    <>
      <img
        src={src}
        alt=""
        width={imageSettings.width}
        height={imageSettings.height}
        onClick={openSettings}
      />

      <Dialog open={isShowSettings} onClose={closeSettings}>
        <DialogTitle>Image Settings</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Width"
            variant="standard"
            {...formFields.width.props}
            fullWidth
            autoFocus
          />
          <TextField
            margin="dense"
            label="Height"
            variant="standard"
            {...formFields.height.props}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={applySettings}>Apply</Button>
          <Button onClick={closeSettings}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
