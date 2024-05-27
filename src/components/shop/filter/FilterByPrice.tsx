"use client";

import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FilterDictionary } from '@/interfaces/lang';

type Props = {
  text: FilterDictionary
}

const FilterByPrice = ({text}:Props) => {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initialize the price range from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const min = params.get('minPrice') || '';
    const max = params.get('maxPrice') || '';
    setMinPrice(min);
    setMaxPrice(max);
  }, [searchParams]);

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  // Update the URL parameters when the price range changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }
    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }
    replace(`${pathname}?${params.toString()}`);
  }, [minPrice, maxPrice, pathname, replace, searchParams]);

  return (
    <>
    <div className="pt-4">
          <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
           {text.price}
          </h3>

          <div className="mt-4 flex items-center">
            <input
              type="text"
              name="min"
              id="min"
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
              placeholder="min"
              value={minPrice}
              onChange={handleMinPriceChange}
            />

            <span className="mx-3 text-gray-500">-</span>

            <input
              type="text"
              name="max"
              id="max"
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
              placeholder="max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>

        </div>
    </>
  )
}

export default FilterByPrice