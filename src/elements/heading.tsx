import React from 'react';
import Typography from './typography';

export const HeadingOne: React.FC = props => (
  <Typography
    component="h1"
    size="xl"
    heading
    bottomSpacing="m"
    bold
    {...props}
    color="tertiary"
  />
);
export const HeadingTwo: React.FC = props => (
  <Typography
    component="h2"
    size="l"
    heading
    bottomSpacing="m"
    bold
    {...props}
    color="tertiary"
  />
);
export const HeadingThree: React.FC = props => (
  <Typography
    component="h3"
    size="m"
    heading
    bottomSpacing="m"
    bold
    {...props}
    color="tertiary"
  />
);
export const HeadingFour: React.FC = props => (
  <Typography
    component="h4"
    size="s"
    heading
    bottomSpacing="m"
    bold
    {...props}
    color="tertiary"
  />
);
export const HeadingFive: React.FC = props => (
  <Typography
    component="h5"
    size="xs"
    heading
    bottomSpacing="m"
    bold
    {...props}
    color="tertiary"
  />
);
export const HeadingSix: React.FC = props => (
  <Typography
    component="h6"
    size="xs"
    heading
    bottomSpacing="m"
    bold
    {...props}
    color="tertiary"
  />
);
