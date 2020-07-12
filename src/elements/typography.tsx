import React, { HTMLAttributes } from 'react';
import { getClasses } from '../utils/get-classes';
import styles from './typography.module.scss';

const sizeToClassMap = {
  xl: styles.xl,
  l: styles.l,
  m: styles.m,
  s: styles.s,
  xs: styles.xs,
  xxs: styles.xxs,
};

const colorToClassMap = {
  primary: styles.primaryColor,
  secondary: styles.secondaryColor,
  'secondary-light': styles.secondaryLightColor,
  tertiary: styles.tertiaryColor,
  default: styles.defaultColor,
};

const spacingToClassMap = {
  s: styles.bottomSpacingSmall,
  m: styles.bottomSpacingMedium,
  l: styles.bottomSpacingLarge,
};

const Typography: React.FC<TypographyProps> = ({
  component = 'p',
  size = 's',
  color,
  bold,
  italic,
  strikethrough,
  underline,
  heading,
  link,
  children,
  className,
  transform,
  bottomSpacing,
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
    link && styles.anchor,
    transform && styles[transform],
    color && colorToClassMap[color],
    bottomSpacing && spacingToClassMap[bottomSpacing],
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

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  component?: TypographyComponentType;
  size?: keyof typeof sizeToClassMap;
  color?: keyof typeof colorToClassMap;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  heading?: boolean;
  transform?: 'uppercase' | 'lowercase' | 'capitalize';
  link?: boolean;
  bottomSpacing?: keyof typeof spacingToClassMap;
}

export default Typography;
