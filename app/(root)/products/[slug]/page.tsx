import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/ProductDetail';
import { RatingSection } from '@/components/rating/RatingSection';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getProductBySlug } from '@/lib/actions/product/get-product-by-slug';

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  props: ProductDetailsPageProps,
): Promise<Metadata> {
  const params = await props.params;

  const [productErr, productData] = await getProductBySlug({
    slug: params.slug,
  });

  if (productErr || !productData) {
    return {
      title: 'Product Not Found',
      description: 'The requested product does not exist.',
    };
  }

  return {
    title: productData.name,
    description: productData.description,
  };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;

  const [productErr, product] = await getProductBySlug({ slug });

  if (productErr || !product) {
    console.error('Product not found:', productErr);
    notFound();
  }

  const [, cart] = await getMyCart();

  const item = cart?.items.find((item) => item.productId === product.id);

  const quantity = item?.quantity ?? 0;

  return (
    <div className="flex flex-col gap-10">
      <ProductDetail
        product={product}
        quantity={quantity}
        isItemExist={!!item}
      />

      <RatingSection productId={product.id} />
    </div>
  );
};

export default ProductDetailsPage;
