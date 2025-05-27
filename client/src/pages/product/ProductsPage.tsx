import { ProductForm } from "@features/auth/ui/productsForm";
import './productPage.css';
import { ProductList } from "@pages/product/ProductList/ProductList";

export const ProductsPage = () => {
  return (
    <div className="products-page">
      <h1 className="products-page__title">Products page</h1>
        <ProductForm />
      <ProductList />
    </div>
  );
};