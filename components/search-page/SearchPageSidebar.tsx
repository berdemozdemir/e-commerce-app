'use client';

import Link from 'next/link';
import { Input } from '../ui/Input';
import { Star } from 'lucide-react';
import { FC } from 'react';

type Props = {
  categories: string[];
};

export const SearchPageSidebar: FC<Props> = ({ categories }) => {
  return (
    <div className="pr-4">
      {/* Categories */}
      <section className="mb-8 flex flex-col gap-2">
        <h1>Categories</h1>

        <SideBarItem name="All" />

        {categories.map((category) => (
          <SideBarItem key={category} name={category} />
        ))}
      </section>

      {/* Price  */}
      <section className="mb-8">
        <h1 className="mb-2">Price</h1>

        <div className="flex gap-2">
          <div className="group relative">
            <Input
              className="peer h-12 border px-3 pt-5"
              type="number"
              placeholder=" "
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />

            <p
              className={`absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-[#62748E] transition-all duration-200 ease-out group-focus-within:top-2 group-focus-within:translate-y-0 group-focus-within:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs`}
            >
              min
            </p>
          </div>

          <div className="group bgre relative">
            <Input
              className="peer h-12 border px-3 pt-5"
              type="number"
              placeholder=" "
            />

            <p
              className={`absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-[#62748E] transition-all duration-200 ease-out group-focus-within:top-2 group-focus-within:translate-y-0 group-focus-within:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs`}
            >
              max
            </p>
          </div>
        </div>
      </section>

      {/* Customer Rating */}
      <section className="flex flex-col gap-2">
        <h1>Rating</h1>

        <div className="flex items-center gap-2">
          <Star />
        </div>

        <div className="flex items-center gap-2">
          <Star /> <Star />
        </div>

        <div className="flex items-center gap-2">
          <Star /> <Star /> <Star />
        </div>

        <div className="flex items-center gap-2">
          <Star /> <Star /> <Star /> <Star />
        </div>

        <div className="flex items-center gap-2">
          <Star /> <Star /> <Star /> <Star /> <Star />
        </div>
      </section>
    </div>
  );
};

const SideBarItem = ({ name }: { name: string }) => {
  return <Link href={`/search?category=${name}`}>{name}</Link>;
};
