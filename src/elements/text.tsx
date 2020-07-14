import React from 'react';
import styles from './text.module.scss';
import Typography from './typography';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export const Paragraph: React.FC = props => (
  <Typography component="p" {...props} className={styles.paragraph} />
);

export const Italic: React.FC = props => (
  <Typography component="em" italic {...props} />
);

export const Bold: React.FC = props => (
  <Typography component="strong" bold {...props} />
);

export const AnchorTag: React.FC = ({ children, ...props }) => (
  <OutboundLink {...props}>
    <Typography component="span" link>
      {children}
    </Typography>
  </OutboundLink>
);
