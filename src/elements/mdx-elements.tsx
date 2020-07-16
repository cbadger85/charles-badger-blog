import React from 'react';
import BlockQuote from './block-quote';
import CodeBlock from './code-block';
import CodePen from './codepen';
import {
  HeadingFive,
  HeadingFour,
  HeadingOne,
  HeadingSix,
  HeadingThree,
  HeadingTwo,
} from './heading';
import Image from './image';
import { ListItem, OrderedList, UnorderedList } from './list-elements';
import { AnchorTag, Bold, Italic, Paragraph } from './text';

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
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  CodePen,
};

interface PreToCodBlockProps {
  children?: {
    props?: {
      mdxType: string;
    };
  };
}
