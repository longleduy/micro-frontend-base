// --- Post bootstrap -----
import React from 'react';

import ProductCategories from '../modules/views/ProductCategories';
import ProductHero from '../modules/views/ProductHero';
import withRoot from '../modules/withRoot';

function Index() {
  return (
    <React.Fragment>
      <ProductHero />
      <ProductCategories />
    </React.Fragment>
  );
}

export default withRoot(Index);
