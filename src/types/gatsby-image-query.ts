import { FluidObject } from 'gatsby-image';

export interface GatsbyImageQuery {
  placeholderImage: {
    childImageSharp: {
      fluid: FluidObject | FluidObject[];
    };
  };
}
