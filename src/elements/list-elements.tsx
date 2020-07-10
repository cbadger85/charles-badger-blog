import React from 'react';
import styles from './list-elements.module.scss';

export const UnorderedList: React.FC = props => (
  <ul {...props} className={styles.list} />
);

export const OrderedList: React.FC = props => (
  <ol {...props} className={styles.list} />
);

export const ListItem: React.FC = props => (
  <li {...props} className={styles.listItem} />
);
