// Import necessary components and libraries
import React from 'react';
import BreadCrumb from '@/components/shared/breadCamp';
import Image from 'next/image';
import { Metadata } from 'next';
import appConfig from '@/config';

export const metadata: Metadata = {
  title: "Lwskart - About Us",
  description: "Lwskart - About Us Page, where you can see all the information about us",
  openGraph: {
    title: "Lwskart",
    images: [
      {
        url: `${appConfig.baseUrl}/api/og?title=Lwskart%20-%20About%20Us&description=Lwskart%20-%20About%20Us%20Page,%20where%20you%20can%20see%20all%20the%20information%20about%20us`,
        width: 1200,
        height: 630,
        alt: "Lwskart",
      },
    ],
    siteName: "Lwskart",
    type: "website",
    locale: "en_US",
  },
};


const AboutUsPage = () => {
  return (
    <div className='container mx-auto px-4'>
      <BreadCrumb />
      <h1 className='text-3xl font-bold text-gray-800 mt-8 mb-4'>About Us</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className=''>
          <Image src='/images/banner-bg.jpg' alt='About Us' className='w-full rounded-lg shadow-md' 
            width={600} height={400}
           />
        </div>
        <div className=''>
          <p className='text-lg text-gray-700 leading-relaxed mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
            quae sunt a te dicta? Quae cum dixisset, finem ille.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
            quae sunt a te dicta? Quae cum dixisset, finem ille.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
