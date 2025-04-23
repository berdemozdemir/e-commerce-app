import { ProductImages } from '@/components/product/ProductImages';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import { getProductBySlug } from '@/lib/actions/product.action';
import { notFound } from 'next/navigation';

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const [int, decimal = '00'] = product.price.split('.');

  return (
    <div className="grid-col-1 grid w-full md:grid-cols-5">
      <div className="col-span-5 lg:col-span-2">
        <ProductImages images={product.images} />
      </div>

      <div className="col-span-5 flex flex-col gap-6 p-5 lg:col-span-2">
        <p>
          {product.brand} | {product.category}
        </p>

        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p>
          {product.rating} of {product.numReviews} Reviews
        </p>

        <Badge variant={'success'} className="rounded-full px-8 py-6 text-lg">
          <span className="text-xl font-bold">
            <span className="align-top text-base">$</span>

            {int}

            <span className="align-top text-base">.{decimal}</span>
          </span>
        </Badge>

        <p className="-mb-4 font-semibold">Description</p>

        <p>{product.description}</p>
      </div>

      <div className="col-span-5 h-fit items-start space-y-3 rounded-lg border-2 p-4 lg:col-span-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg">Price</p>

          <span className="text-xl font-bold">
            <span className="align-top text-base">$</span>

            {int}

            <span className="align-top text-base">.{decimal}</span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-lg">Status</p>

          <Badge variant={product.stock > 0 ? 'outline' : 'destructive'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>

        <Button disabled={product.stock <= 0} className="w-full">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
