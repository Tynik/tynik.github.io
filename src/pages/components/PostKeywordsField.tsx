import React from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';

type PostKeywordsFieldProps = {
  keywords: string[];
  onChange: (keywords: string[]) => void;
};

export const PostKeywordsField = ({ keywords, onChange }: PostKeywordsFieldProps) => {
  const addKeywordHandler: React.KeyboardEventHandler<HTMLDivElement> = event => {
    if (event.key === 'Enter') {
      const newKeyword = ((event.target as any).value as string).trim();

      if (newKeyword.length > 0 && !keywords.includes(newKeyword)) {
        onChange([...keywords, newKeyword]);

        (event.target as any).value = '';
      }
    }
  };

  const removeKeywordHandler = (keywordIndex: number) => {
    const newKeywords = [...keywords];

    newKeywords.splice(keywordIndex, 1);

    onChange(newKeywords);
  };

  return (
    <Autocomplete
      value={keywords}
      options={keywords}
      onChange={(event, keywords) => {
        onChange(keywords);
      }}
      renderTags={(keywords, getTagProps) =>
        keywords.map((keyword, index) => (
          <Chip
            label={keyword}
            {...getTagProps({ index })}
            onDelete={() => removeKeywordHandler(index)}
            sx={{ m: 0.5 }}
          />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          label="Keywords"
          placeholder="Enter keywords"
          onKeyDown={addKeywordHandler}
        />
      )}
      multiple
      freeSolo
      fullWidth
    />
  );
};
