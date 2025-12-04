import { ProductDetail } from '@/components/product/ProductDetail';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getProductBySlug } from '@/lib/actions/product.action';
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

  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product does not exist.',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cart = await getMyCart();

  const quantity = cart?.items.find(
    (item) => item.productId === product.id,
  )?.quantity;

  const isItemExist = !!cart?.items.find(
    (item) => item.productId === product.id,
  );

  // TODO: take a look at this error & loading handling, is this the best way to do it?
  // if (isLoading || error || !product) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       {isLoading && 'Loading...'}
  //       {error && `Error: ${error.message}`}
  //       {!isLoading && !error && !product && notFound()}
  //     </div>
  //   );
  // }

  return (
    <ProductDetail
      product={product}
      quantity={quantity}
      isItemExist={isItemExist}
    />
  );
};

export default ProductDetailsPage;
