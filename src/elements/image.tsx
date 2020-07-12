import React, { ImgHTMLAttributes } from 'react';
import { getClasses } from '../utils/get-classes';
import styles from './image.module.scss';
import { IMAGE_MAX_WIDTH } from '../../gatsby/constants';

const Image: React.FC<ImgHTMLAttributes<HTMLImageElement>> = props => {
  console.log(props);
  return (
    <img
      width={props.loading === 'lazy' ? IMAGE_MAX_WIDTH : undefined}
      {...props}
      className={getClasses(props.className, styles.image)}
    />
  );
};

export default Image;
