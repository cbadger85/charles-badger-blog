import React, { useContext } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/vsDark';
import lightTheme from 'prism-react-renderer/themes/github';
import styles from './code-block.module.scss';
import { getClasses } from '../utils/get-classes';
import { ThemeContext } from '../utils/color-theme';

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className.replace(/language-/, '') as Language;
  const { colorTheme } = useContext(ThemeContext);

  const modifiedLightTheme = {
    ...lightTheme,
    plain: { ...lightTheme.plain, backgroundColor: '#e4e7eb' },
  };

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={colorTheme === 'dark' ? darkTheme : modifiedLightTheme}
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
