import { useEffect } from "react";
import ProductListingComponent from "../../components/product/ProductListingComponent";

function ProductList() {
  useEffect(() => {
    document.title = `${process.env.NEXT_PUBLIC_APP_NAME} | Explore Products`;
  });

  return <ProductListingComponent path="" />;
}

export default ProductList;
