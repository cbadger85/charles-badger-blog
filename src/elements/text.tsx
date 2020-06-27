import React from 'react';
import Typography from './typography';
import styles from './text.module.scss';

export const Paragraph: React.FC = props => (
  <Typography component="p" {...props} />
);

export const Italic: React.FC = props => (
  <Typography component="em" italic {...props} />
);

export const Bold: React.FC = props => (
  <Typography component="strong" bold {...props} />
);

export const AnchorTag: React.FC = props => (
  <Typography component="a" {...props} className={styles.anchor} />
);
