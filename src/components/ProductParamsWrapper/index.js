import React from 'react';
import { useParams } from 'react-router-dom';
import ProductItemDetails from '../ProductItemDetails';

const ProductParamsWrapper = () => {
  const params = useParams(); // Retrieve route parameters
  return <ProductItemDetails params={params} />;
};

export default ProductParamsWrapper;
