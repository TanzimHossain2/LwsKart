
import Image from 'next/image';
import Link from 'next/link';


const Ads = () => {
  return (
    <div className="container pb-16">
      <Link href="#">
        <Image src="/images/offer.jpg" alt="ads" layout="responsive" width={1200} height={600} />
      </Link>
    </div>
  );
}

export default Ads;
