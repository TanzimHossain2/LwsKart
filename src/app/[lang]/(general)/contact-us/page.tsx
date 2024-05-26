// Import necessary components and libraries
import React from 'react';
import BreadCrumb from '@/components/shared/breadCamp';
import Image from 'next/image';

// Dummy Contact Us page component
const ContactUsPage = () => {
  return (
    <div className='container mx-auto px-4'>
      <BreadCrumb />
      <h1 className='text-3xl font-bold text-gray-800 mt-8 mb-4'>Contact Us</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className=''>
        <Image src='/images/banner-bg.jpg' alt='Contact Us' className='w-full rounded-lg shadow-md' 
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

export default ContactUsPage;
