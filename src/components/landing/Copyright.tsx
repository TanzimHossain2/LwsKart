import React from 'react';
import Image from 'next/image';

const Copyright = () => {
  return (
    <div className="bg-gray-800 py-4">
      <div className="container flex items-center justify-between">
        <p className="text-white">&copy; TailCommerce - All Right Reserved</p>
        <div>
          <Image src="/images/methods.png" alt="methods" width={100} height={20} />
        </div>
      </div>
    </div>
  );
}

export default Copyright;
