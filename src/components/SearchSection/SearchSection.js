import React from 'react'

import { useTranslation } from 'react-i18next';

import styles from './search.module.scss'


export default function SearchSection() {

  const { t } = useTranslation();

  return (
    <section className={styles.search}>
      <div className={styles.search__wrapper}>
        <div>
          <h1 className={styles.search__title}> {t('heading')} </h1>
        </div>
      </div>
    </section>
  )
}
