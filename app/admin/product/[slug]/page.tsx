import { UpdateProductForm } from '@/components/admin/UpdateProductForm';
import { getProductBySlug } from '@/lib/actions/product/get-product-by-slug';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

type ProductUpdatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  props: ProductUpdatePageProps,
): Promise<Metadata> {
  const params = await props.params;

  const product = await getProductBySlug({ slug: params.slug, isAdmin: true });

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

const UpdateProductPage = async ({ params }: ProductUpdatePageProps) => {
  const { slug } = await params;

  const product = await getProductBySlug({ slug, isAdmin: true });

  if (isFailure(product) || !product.data) {
    console.error('Product not found:', product.error);
    redirect(paths.notFound);
  }

  return <UpdateProductForm product={product.data} />;
};

export default UpdateProductPage;
