import React from 'react';
import styles from './block-quote.module.scss';

const BlockQuote: React.FC = props => <blockquote className={styles.blockquote} {...props} />;

export default BlockQuote;
