import { Box, css, styled, Theme } from '@mui/material';

export const RichEditorCodeStyles = (theme: Theme) => css`
  pre code {
    font-size: 1rem;
  }
`;

export const RichEditorStyled = styled(Box)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    min-height: 360px;

    .DraftEditor-root {
      width: 100%;

      font-size: 16px;

      border: 1px solid #000;
      overflow-y: auto;
    }

    .DraftEditor-editorContainer,
    .public-DraftEditor-content {
      height: 100%;
    }

    ${RichEditorCodeStyles(theme)}
  `
);
