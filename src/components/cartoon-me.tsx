import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { GatsbyImageQuery } from '../types/gatsby-image-query';

const CartoonMe: React.FC<CartoonMeProps> = ({ className }) => {
  const data = useStaticQuery<GatsbyImageQuery>(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "me.png" }) {
        childImageSharp {
          fluid(maxWidth: 200, quality: 100) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
    }
  `);

  return (
    <Img
      fluid={data.placeholderImage.childImageSharp.fluid}
      alt="Me as a cartoon"
      style={{ width: 200 }}
      className={className}
    />
  );
};

export default CartoonMe;

interface CartoonMeProps {
  className?: string;
}
