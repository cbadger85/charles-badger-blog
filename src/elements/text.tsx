import React from 'react';
import styles from './text.module.scss';
import Typography from './typography';

export const Paragraph: React.FC = props => (
  <Typography component="p" {...props} className={styles.paragraph} />
);

export const Italic: React.FC = props => (
  <Typography component="em" italic {...props} />
);

export const Bold: React.FC = props => (
  <Typography component="strong" bold {...props} />
);

export const AnchorTag: React.FC = props => (
  <Typography component="a" {...props} link />
);
