import React from 'react';
import Typography from './typography';

export const Paragraph: React.FC = props => (
  <Typography component="p" size="s" {...props} />
);

export const Italic: React.FC = props => (
  <Typography component="em" size="s" italic {...props} />
);

export const Bold: React.FC = props => (
  <Typography component="strong" size="s" bold {...props} />
);
