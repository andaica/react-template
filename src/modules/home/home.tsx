import React from 'react';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  return <h2>{t('home.title')}</h2>;
}

export default Home;
