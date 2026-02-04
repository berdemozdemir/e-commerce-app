import { ProductDetail } from '@/components/product/ProductDetail';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getProductBySlug } from '@/lib/actions/product/get-product-by-slug';
import { isFailure } from '@/lib/result';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  props: ProductDetailsPageProps,
): Promise<Metadata> {
  const params = await props.params;

  const product = await getProductBySlug({ slug: params.slug });

  if (isFailure(product)) {
    return {
      title: 'Product Not Found',
      description: 'The requested product does not exist.',
    };
  }

  return {
    title: product.data.name,
    description: product.data.description,
  };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;

  const product = await getProductBySlug({ slug });

  if (isFailure(product) || !product.data) {
    console.error('Product not found:', product.error);
    notFound();
  }

  const cartResult = await getMyCart();

  const cart = cartResult.data;

  const item = cart?.items.find((item) => item.productId === product.data.id);

  const quantity = item?.quantity ?? 0;

  return (
    <ProductDetail
      product={product.data}
      quantity={quantity}
      isItemExist={!!item}
    />
  );
};

export default ProductDetailsPage;
