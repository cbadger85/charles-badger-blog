import React, { ImgHTMLAttributes } from 'react';
import { getClasses } from '../utils/getClasses';
import styles from './image.module.scss';

const Image: React.FC<ImgHTMLAttributes<HTMLImageElement>> = props => (
  <img {...props} className={getClasses(props.className, styles.image)} />
);

export default Image;
