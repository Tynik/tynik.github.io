import React, { useEffect, useState } from 'react';

import type { SelectChangeEvent } from '@mui/material';

import { EditorBlock, Modifier } from 'draft-js';
import { Box, FormControl, InputLabel, MenuItem, Popover, Select } from '@mui/material';

import type { ActiveBlockRendererComponent } from '../RichEditor.types';

type Language = 'javascript' | 'solidity';

type LanguageOption = {
  value: Language;
  label: string;
};

const LANGUAGES: LanguageOption[] = [
  {
    value: 'javascript',
    label: 'JavaScript',
  },
  {
    value: 'solidity',
    label: 'Solidity',
  },
];

export const CodeBlockRenderer = (props: ActiveBlockRendererComponent) => {
  const {
    contentState,
    selection,
    block,
    blockProps: { setEditorReadOnly, onUpdateContent },
  } = props;

  const codeAttributes = block.getData();

  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(null);

  const [language, setLanguage] = useState<Language>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    codeAttributes.get('language') ?? 'javascript'
  );

  useEffect(() => {
    setEditorReadOnly(Boolean(settingsAnchorEl));
  }, [settingsAnchorEl]);

  const openSettings: React.MouseEventHandler<HTMLElement> = e => {
    // double click
    if (e.detail === 2) {
      setSettingsAnchorEl(e.currentTarget);
    }
  };

  const closeSettings = () => {
    setSettingsAnchorEl(null);
  };

  const onChangeLanguage = (e: SelectChangeEvent<Language>) => {
    setLanguage(e.target.value as Language);

    const data = block.getData();
    const newData = data.set('language', e.target.value);

    onUpdateContent(Modifier.setBlockData(contentState, selection, newData));
  };

  return (
    <>
      <pre onClick={openSettings}>
        <code className={`language-${language}`}>
          <EditorBlock {...props} />
        </code>
      </pre>

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
        <Box p={1}>
          <FormControl fullWidth>
            <InputLabel id="select-language">Language</InputLabel>

            <Select
              labelId="select-language"
              value={language}
              label="Language"
              onChange={onChangeLanguage}
            >
              {LANGUAGES.map(language => (
                <MenuItem key={language.value} value={language.value}>
                  {language.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Popover>
    </>
  );
};
