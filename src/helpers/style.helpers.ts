export const getTextOverflowStyles = (maxLines = 2) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: maxLines,
});
