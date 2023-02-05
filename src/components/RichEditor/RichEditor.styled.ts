import { Box, css, styled, Theme } from '@mui/material';

export const RichEditorCodeStyles = (theme: Theme) => css`
  .code {
    margin: ${theme.spacing(2)};
    padding: ${theme.spacing(1)};

    border-radius: ${theme.shape.borderRadius}px;
    background-color: ${theme.palette.grey['800']};
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
