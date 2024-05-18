import BreadCamp from "@/components/shared/breadCamp";
import BillingAdress from "../address/BillingAdress";
import ShipingAdress from "../address/ShipingAdress";

import PersonalInfo from "./PersonalInfo";
import ProfileList from "./ProfileList";
import { currentUser } from "@/lib/authUser";

const ProfileInfo =async () => {
  const user =await currentUser();

  return (
    <>
      <BreadCamp />
          <ProfileList />
      <div className="container  items-start gap-6 pt-4 pb-16">
        <div className="grid grid-cols-3 gap-4 mx-auto max-w-5xl">
        {user && <PersonalInfo user={user} />}
          <ShipingAdress />
          <BillingAdress />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
