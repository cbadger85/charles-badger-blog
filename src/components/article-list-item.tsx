import React from 'react';
import { Link } from 'gatsby';
import styles from './article-list-item.module.scss';
import Typography from '../elements/typography';
import slugify from 'slugify';
import Pill from './pill';

const ArticleListItem: React.FC<ArticleListItemProps> = ({
  slug,
  categories,
  title,
  date,
}) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.articleItem}>
        <div className={styles.firstRow}>
          <Typography component="span" bold size="m">
            <Link to={`/blog/posts${slug}`} className={styles.articleLink}>
              {title}
            </Link>
          </Typography>
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
