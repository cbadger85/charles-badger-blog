import React, { HTMLAttributes } from 'react';
import { getClasses } from '../utils/getClasses';
import styles from './typography.module.scss';

const sizeToClassMap: Record<TypographySize, string> = {
  xl: styles.xl,
  l: styles.l,
  m: styles.m,
  s: styles.s,
  xs: styles.xs,
};

const Typography: React.FC<TypographyProps> = ({
  component = 'p',
  size = 's',
  bold,
  italic,
  strikethrough,
  underline,
  heading,
  children,
  className,
  transform,
  ...props
}) => {
  const Component: React.ElementType = component;
  const classes = getClasses(
    className,
    sizeToClassMap[size],
    bold && styles.bold,
    italic && styles.italic,
    strikethrough && !underline && styles.strikethrough,
    underline && !strikethrough && styles.underline,
    underline && strikethrough && styles.underlineStrikethrough,
    heading && styles.heading,
    transform && styles[transform],
    styles.typography
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

type TypographyComponentType =
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'strong'
  | 'em'
  | 'a';

type TypographySize = 'xl' | 'l' | 'm' | 's' | 'xs';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  component?: TypographyComponentType;
  size?: TypographySize;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  heading?: boolean;
  transform?: 'uppercase' | 'lowercase' | 'capitalize';
}

export default Typography;
