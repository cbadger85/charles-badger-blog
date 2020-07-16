import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../utils/color-theme';

const CODEPEN_SRC = 'https://static.codepen.io/assets/embed/ei.js';

const CodePen: React.FC<CodePenProps> = ({
  title,
  user,
  themeId = 'dark',
  defaultTab = ['result'],
  slugHash,
  style,
  clickToLoad,
  height = 300,
}) => {
  useEffect(() => {
    let scriptTag = document.querySelector('[data-codepen-script]');

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.toggleAttribute('async');
      scriptTag.setAttribute('src', CODEPEN_SRC);
      scriptTag.toggleAttribute('data-codepen-script');
      document.body.appendChild(scriptTag);
    }

    return () => {
      scriptTag?.remove();
    };
  });

  return (
    <>
      <p
        className="codepen"
        data-height={height.toString()}
        data-theme-id={themeId}
        data-default-tab={defaultTab.join(',')}
        data-user={user}
        data-slug-hash={slugHash}
        data-pen-title={title}
        data-preview={clickToLoad}
        style={style}
      >
        <span>
          See the Pen{' '}
          <a href="https://codepen.io/Mamboleoo/pen/XWJPxpZ">{title}</a>{' '}
          {user && (
            <>
              by Louis Hoebregts (
              <a href="https://codepen.io/Mamboleoo">@{user}</a>){' '}
            </>
          )}
          on <a href="https://codepen.io">CodePen</a>.
        </span>
      </p>
    </>
  );
};

export default CodePen;

type CodePenTab = 'css' | 'html' | 'js' | 'result';

interface CodePenProps {
  title: string;
  slugHash: string;
  user?: string;
  themeId?: 'light' | 'dark' | string;
  defaultTab?: CodePenTab[];
  height?: number | string;
  style?: React.CSSProperties;
  clickToLoad?: boolean;
}
