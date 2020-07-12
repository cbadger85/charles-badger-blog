import { Link } from 'gatsby';
import React from 'react';
import slugify from 'slugify';
import Pill from './pill';
import styles from './category-links.module.scss';

const CategoryLinks: React.FC<{ categories: string[] }> = ({ categories }) => (
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

export default CategoryLinks;
