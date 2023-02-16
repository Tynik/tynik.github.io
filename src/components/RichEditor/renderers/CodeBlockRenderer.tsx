import React, { useEffect, useState } from 'react';

import type { SelectChangeEvent } from '@mui/material';

import { EditorBlock, Modifier } from 'draft-js';
import { Box, FormControl, InputLabel, MenuItem, Popover, Select } from '@mui/material';

import type { ActiveBlockRendererComponent } from '../RichEditor.types';

type SourceCodeLanguage = 'typescript' | 'javascript' | 'solidity' | 'bash';

type SourceCodeLanguageOption = {
  value: SourceCodeLanguage;
  label: string;
};

const SOURCE_CODE_LANGUAGES: SourceCodeLanguageOption[] = [
  {
    value: 'typescript',
    label: 'TypeScript',
  },
  {
    value: 'javascript',
    label: 'JavaScript',
  },
  {
    value: 'solidity',
    label: 'Solidity',
  },
  {
    value: 'bash',
    label: 'Bash',
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

  const [language, setLanguage] = useState<SourceCodeLanguage>(
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

  const onChangeLanguage = (e: SelectChangeEvent<SourceCodeLanguage>) => {
    setLanguage(e.target.value as SourceCodeLanguage);

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
              {SOURCE_CODE_LANGUAGES.map(language => (
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
