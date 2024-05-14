import BreadCamp from "@/components/shared/breadCamp";
import BillingAdress from "../address/BillingAdress";
import ShipingAdress from "../address/ShipingAdress";

import PersonalInfo from "./PersonalInfo";

const ProfileInfo = () => {
  return (
    <>
      <BreadCamp />
      <div className="container  items-start gap-6 pt-4 pb-16">
        <div className="grid grid-cols-3 gap-4 mx-auto max-w-5xl">
          <PersonalInfo />
          <ShipingAdress />
          <BillingAdress />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
