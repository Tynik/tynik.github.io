import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const RichEditorStyled = styled(Box)`
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
`;
