import { useRouter } from 'next/router';
import { useAuth } from "../context/AuthContext";
import { Product } from '../types/interfaces';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { productID } = router.query;
  const {products}: any = useAuth()

  const productByID = products?.find((product: Product) => product.id.toString() === productID);

  return (
    <>
      {productByID && <ProductCard {...productByID} />}
    </>
  );
};

export default ProductDetails;
