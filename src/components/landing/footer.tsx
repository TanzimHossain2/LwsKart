import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FooterDictionary } from '@/interfaces/lang';
import { FacebookIcon } from 'react-share';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { Facebook, Github, Instagram, Twitter } from 'lucide-react';

type Props = {
  dictionary: FooterDictionary;
};

const Footer = ({dictionary}:Props) => {

  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="container grid grid-cols-1 ">
        <div className="col-span-1 space-y-4">
          <Image src="/images/logo.svg" alt="logo" width={220} height={130} />
          <div className="mr-2">
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, hic?
            </p>
          </div>
          <div className="flex space-x-5 pb-2">
            <Link href="#" className="text-gray-400 hover:text-gray-500">
            <Facebook size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
      
            <Instagram />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
            <Twitter />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-500">
            <Github />
            </Link>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {dictionary.solution}
              </h3>
              <div className="mt-4 space-y-4">
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.marketing}
                </Link>
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.analytics}
                </Link>
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.commerce}
                </Link>
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.insights}
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {dictionary.support}
              </h3>
              <div className="mt-4 space-y-4">
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.price}
                </Link>
                {/* <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</Link> */}
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.guide}
                </Link>
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.api_status}
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {dictionary.solution}
              </h3>
              <div className="mt-4 space-y-4">
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.marketing}
                </Link>
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.analytics}
                </Link>
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.commerce}
                </Link>
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.insights}
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {dictionary.support}
              </h3>
              <div className="mt-4 space-y-4">
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.price}
                </Link>
                {/* <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">Documentation</Link> */}
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.guide}
                </Link>
                <Link href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  {dictionary.api_status}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
