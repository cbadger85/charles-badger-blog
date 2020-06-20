import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from '../elements/code-block';
import {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  HeadingFive,
  HeadingSix,
} from '../elements/heading';
import { Paragraph, Bold, Italic } from '../elements/text';
import Image from '../elements/image';

const preToCodeBlock: React.FC<PreToCodBlockProps> = preProps => {
  if (preProps.children?.props?.mdxType === 'code') {
    return <CodeBlock {...preProps.children.props} />;
  }

  return <pre {...preProps} />;
};

const components = {
  pre: preToCodeBlock,
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  h4: HeadingFour,
  h5: HeadingFive,
  h6: HeadingSix,
  p: Paragraph,
  em: Italic,
  strong: Bold,
  img: Image,
};

export const wrapRootElement: React.FC<WrapRootElementProps> = ({
  element,
}) => <MDXProvider components={components}>{element}</MDXProvider>;

interface WrapRootElementProps {
  element: JSX.Element;
}

interface PreToCodBlockProps {
  children?: {
    props?: {
      mdxType: string;
    };
  };
}
