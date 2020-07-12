import React, { useState } from 'react';
import { Link } from 'gatsby';
import styles from './article-list-item.module.scss';
import Typography from '../elements/typography';
import slugify from 'slugify';
import Pill from './pill';
import { navigate } from 'gatsby';
import { useMediaQuery } from '../hooks/useMediaQuery';

const CategoryPills: React.FC<{ categories: string[] }> = ({ categories }) => (
  <section className={styles.pillWrapper} aria-label="Categories">
    {categories.map(category => (
      <Link
        key={category}
        className={styles.pillLink}
        to={`/blog/categories/${slugify(category.toLowerCase())}/1`}
      >
        <Pill className={styles.pill}>{category}</Pill>
      </Link>
    ))}
  </section>
);

const ArticleListItem: React.FC<ArticleListItemProps> = ({
  slug,
  categories,
  title,
  date,
  excerpt,
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
    <section
      className={styles.cardWrapper}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.articleItem}>
        <div className={styles.firstRow}>
          <Link to={`/blog/posts${slug}`} className={styles.articleLink}>
            <Typography
              component="h2"
              bold
              size={isPhone ? 's' : 'm'}
              color="secondary"
            >
              {title}
            </Typography>
          </Link>
        </div>
        <Typography size="xxs">{date}</Typography>
        <Typography
          size={isPhone ? 'xs' : 's'}
          component="p"
          className={styles.excerpt}
        >
          {excerpt}
        </Typography>
        <div className={styles.lastRow}>
          <Link to={`/blog/posts${slug}`} className={styles.articleLink}>
            <Typography bold size="s" className={styles.readMoreLink}>
              Read More
              <i
                role="img"
                aria-label="point-right"
                className={styles.arrowRight}
              />
            </Typography>
          </Link>
          {!isPhone && <CategoryPills categories={categories} />}
        </div>
      </div>
    </section>
  );
};

export default ArticleListItem;

interface ArticleListItemProps {
  slug: string;
  categories: string[];
  title: string;
  date: string;
  excerpt?: string;
}
