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
  console.log(categories);
  return (
    <div className={styles.articleItem}>
      <div className={styles.firstRow}>
        <Link to={`/blog/posts${slug}`} className={styles.articleTitle}>
          <Typography component="span" bold size="m">
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
      <div>
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
