import React from 'react';
import Typography from './typography';

export const HeadingOne: React.FC = props => (
  <Typography
    component="h1"
    size="xl"
    heading
    bold
    {...props}
    color="secondary"
  />
);
export const HeadingTwo: React.FC = props => (
  <Typography
    component="h2"
    size="l"
    heading
    bold
    {...props}
    color="secondary"
  />
);
export const HeadingThree: React.FC = props => (
  <Typography
    component="h3"
    size="m"
    heading
    bold
    {...props}
    color="secondary"
  />
);
export const HeadingFour: React.FC = props => (
  <Typography
    component="h4"
    size="s"
    heading
    bold
    {...props}
    color="secondary"
  />
);
export const HeadingFive: React.FC = props => (
  <Typography
    component="h5"
    size="xs"
    heading
    bold
    {...props}
    color="secondary"
  />
);
export const HeadingSix: React.FC = props => (
  <Typography
    component="h6"
    size="xs"
    heading
    bold
    {...props}
    color="secondary"
  />
);
