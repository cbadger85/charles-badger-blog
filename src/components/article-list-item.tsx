import React, { useState } from 'react';
import { Link } from 'gatsby';
import styles from './article-list-item.module.scss';
import Typography from '../elements/typography';
import slugify from 'slugify';
import Pill from './pill';
import { navigate } from 'gatsby';
import { useMediaQuery } from '../hooks/useMediaQuery';

const CategoryPills: React.FC<{ categories: string[] }> = ({ categories }) => (
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
);

const ArticleListItem: React.FC<ArticleListItemProps> = ({
  slug,
  categories,
  title,
  date,
}) => {
  const [clickTimeStamp, setClickTimeStamp] = useState<number>();

  const isPhone = useMediaQuery(570);

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
              size={isPhone ? 's' : 'm'}
              className={styles.articleTitle}
            >
              {title}
            </Typography>
          </Link>
          {!isPhone && <CategoryPills categories={categories} />}
        </div>
        <Typography size="xs">{date}</Typography>
        {isPhone && <CategoryPills categories={categories} />}
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
