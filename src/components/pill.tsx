import React from 'react';
import Typography from '../elements/typography';
import styles from './pill.module.scss';
import { getClasses } from '../utils/getClasses';

const pillColor: Record<string, string> = {
  React: styles.pillReact,
  JavaScript: styles.pillYellow,
  TypeScript: styles.pillTypescript,
};

const Pill: React.FC<PillProps> = ({ children, className }) => {
  return (
    <div
      className={getClasses(
        className,
        styles.pill,
        pillColor[children] || styles.pillBlack
      )}
    >
      <Typography size="xs" bold>
        {children}
      </Typography>
    </div>
  );
};

export default Pill;

interface PillProps {
  children: string;
  className?: string;
}
