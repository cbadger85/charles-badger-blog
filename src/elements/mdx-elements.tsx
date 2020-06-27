import React from 'react';
import CodeBlock from './code-block';
import {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  HeadingFive,
  HeadingSix,
} from './heading';
import { Paragraph, Bold, Italic, AnchorTag } from './text';
import Image from './image';
import BlockQuote from './block-quote';

const preToCodeBlock: React.FC<PreToCodBlockProps> = preProps => {
  if (preProps.children?.props?.mdxType === 'code') {
    return <CodeBlock {...preProps.children.props} />;
  }

  return <pre {...preProps} />;
};

export const components = {
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
  blockquote: BlockQuote,
  a: AnchorTag,
};

interface PreToCodBlockProps {
  children?: {
    props?: {
      mdxType: string;
    };
  };
}
