
import Image from 'next/image';
import Link from 'next/link';
import adsImage from '../../../public/images/offer.jpg';


const Ads = () => {
  return (
    <div className="container pb-16">
      <Link href="#">
        <Image src={adsImage} alt="ads"  width={1200} height={600} placeholder='blur' />
      </Link>
    </div>
  );
}

export default Ads;
