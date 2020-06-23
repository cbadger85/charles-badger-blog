import React, { useState } from 'react';
import { Link } from 'gatsby';
import styles from './article-list-item.module.scss';
import Typography from '../elements/typography';
import slugify from 'slugify';
import Pill from './pill';
import { navigate } from 'gatsby';

const ArticleListItem: React.FC<ArticleListItemProps> = ({
  slug,
  categories,
  title,
  date,
}) => {
  const [clickTimeStamp, setClickTimeStamp] = useState<number>();

  const handleMouseDown = () => {
    setClickTimeStamp(Date.now());
  };

  const handleMouseUp = () => {
    if (clickTimeStamp && Date.now() - clickTimeStamp < 200) {
      navigate(`/blog/posts${slug}`);
    }

    setClickTimeStamp(undefined);
  };

  return (
    <div
      className={styles.cardWrapper}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.articleItem}>
        <div className={styles.firstRow}>
          <Link to={`/blog/posts${slug}`} className={styles.articleLink}>
            <Typography
              component="span"
              bold
              size="m"
              className={styles.articleTitle}
            >
              {title}
            </Typography>
          </Link>
          <div className={styles.pillWrapper}>
            {categories.map(category => (
              <Link
                key={category}
                className={styles.pillLink}
                to={`/blog/categories/${slugify(category)}/1`}
              >
                <Pill className={styles.pill}>{category}</Pill>
              </Link>
            ))}
          </div>
        </div>
        <Typography size="xs">{date}</Typography>
      </div>
    </div>
  );
};

export default ArticleListItem;

interface ArticleListItemProps {
  slug: string;
  categories: string[];
  title: string;
  date: string;
}
