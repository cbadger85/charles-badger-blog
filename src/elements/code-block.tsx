import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import styles from './code-block.module.scss';
import { getClasses } from '../utils/get-classes';

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className.replace(/language-/, '') as Language;

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={getClasses(styles.codeBlock, styles.gatsbyHighlight)}
          data-language={language}
        >
          <pre className={className} style={{ ...style, padding: '20px' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;

interface CodeBlockProps {
  children: string;
  className: string;
}
