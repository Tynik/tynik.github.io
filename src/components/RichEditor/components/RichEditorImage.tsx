import React, { useEffect, useState } from 'react';
import {
  Divider,
  IconButton,
  Popover,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Check as CheckIcon,
  AlignHorizontalCenter as AlignHorizontalCenterIcon,
  AlignHorizontalLeft as AlignHorizontalLeftIcon,
  AlignHorizontalRight as AlignHorizontalRightIcon,
} from '@mui/icons-material';
import { useHoneyForm } from '@tynik/react-honey-form';

import type { ActiveEntityComponent } from '../RichEditor.types';

type ImageAlign = 'left' | 'center' | 'right';

export type RichEditorImageSettingsForm = {
  width: string;
  height: string;
  align: ImageAlign;
};

export type RichEditorImageAttributes = Partial<RichEditorImageSettingsForm> & {
  src: string;
};

type ImageProps = ActiveEntityComponent<RichEditorImageAttributes>;

export const RichEditorImage = ({
  src,
  setEditorReadOnly,
  onUpdate,
  width = '100%',
  height = '100%',
  align = 'center',
}: ImageProps) => {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(null);

  const [imageAttributes, setImageAttributes] = useState<RichEditorImageSettingsForm>({
    width,
    height,
    align,
  });

  const { formFields, submit } = useHoneyForm<RichEditorImageSettingsForm>({
    fields: {
      width: {
        value: imageAttributes.width,
      },
      height: {
        value: imageAttributes.height,
      },
      align: {
        value: imageAttributes.align,
      },
    },
    onSubmit: data => {
      setImageAttributes(data);

      onUpdate(data);

      return Promise.resolve();
    },
  });

  useEffect(() => {
    setEditorReadOnly(Boolean(settingsAnchorEl));
  }, [settingsAnchorEl]);

  const openSettings: React.MouseEventHandler<HTMLElement> = e => {
    setSettingsAnchorEl(e.currentTarget);
  };

  const closeSettings = () => {
    setSettingsAnchorEl(null);
  };

  const applySettings = () => {
    submit()
      .then(() => {
        setSettingsAnchorEl(null);
      })
      .catch(() => {});
  };

  return (
    <div style={{ textAlign: formFields.align.value }}>
      <img
        src={src}
        alt=""
        style={{
          width: imageAttributes.width,
          height: imageAttributes.height,
        }}
        onClick={openSettings}
      />

      <Popover
        anchorEl={settingsAnchorEl}
        open={Boolean(settingsAnchorEl)}
        onClose={closeSettings}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Stack p={1} direction="row" spacing={1} alignItems="center">
          <ToggleButtonGroup
            value={formFields.align.value}
            exclusive
            onChange={(event, value: ImageAlign) => formFields.align.setValue(value)}
          >
            <ToggleButton value="left">
              <AlignHorizontalLeftIcon />
            </ToggleButton>

            <ToggleButton value="center">
              <AlignHorizontalCenterIcon />
            </ToggleButton>

            <ToggleButton value="right">
              <AlignHorizontalRightIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            margin="dense"
            variant="standard"
            label="Width"
            {...formFields.width.props}
            autoFocus
          />

          <TextField
            margin="dense"
            variant="standard"
            label="Height"
            {...formFields.height.props}
          />

          <Divider orientation="vertical" flexItem />

          <IconButton onClick={applySettings}>
            <CheckIcon />
          </IconButton>
        </Stack>
      </Popover>
    </div>
  );
};
