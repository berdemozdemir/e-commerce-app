import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { UpdateProductForm } from '@/components/admin/UpdateProductForm';
import { getProductBySlug } from '@/lib/actions/product/get-product-by-slug';
import { paths } from '@/lib/constants/paths';

type ProductUpdatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  props: ProductUpdatePageProps,
): Promise<Metadata> {
  const params = await props.params;

  const [productErr, productData] = await getProductBySlug({ slug: params.slug, isAdmin: true });

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

const UpdateProductPage = async ({ params }: ProductUpdatePageProps) => {
  const { slug } = await params;

  const [productErr, product] = await getProductBySlug({ slug, isAdmin: true });

  if (productErr || !product) {
    console.error('Product not found:', productErr);
    redirect(paths.notFound);
  }

  return <UpdateProductForm product={product} />;
};

export default UpdateProductPage;
