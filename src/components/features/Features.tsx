import { LandingDictionary } from "@/interfaces/lang";
import Image from "next/image";

interface props {
  text: LandingDictionary;
}

const Features: React.FC<props> = ({ text }) => {
  return (
    <div className="container py-16">
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <Image
            src="/images/icons/delivery-van.svg"
            alt="Delivery"
            className="w-12 h-12 object-contain"
            width={500}
            height={500}
          />
          <div>
            <h4 className="font-medium capitalize text-lg">
              {text.free_shipping}
            </h4>
            <p className="text-gray-500 text-sm">{text.order_over_$200}</p>
          </div>
        </div>

        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <Image
            src="/images/icons/money-back.svg"
            alt="Delivery"
            className="w-12 h-12 object-contain"
            width={500}
            height={500}
          />
          <div>
            <h4 className="font-medium capitalize text-lg">
              {text.money_return}
            </h4>
            <p className="text-gray-500 text-sm">{text.x30_days_return}</p>
          </div>
        </div>

        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
          <Image
            src="/images/icons/service-hours.svg"
            alt="Delivery"
            className="w-12 h-12 object-contain"
            width={500}
            height={500}
          />
          <div>
            <h4 className="font-medium capitalize text-lg">
              {text.support_24_7}
            </h4>
            <p className="text-gray-500 text-sm">{text.customer_support}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
