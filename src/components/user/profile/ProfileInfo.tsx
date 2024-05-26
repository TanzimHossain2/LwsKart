import BreadCamp from "@/components/shared/breadCamp";
import BillingAdress from "../address/BillingAdress";
import ShipingAdress from "../address/ShipingAdress";

import PersonalInfo from "./PersonalInfo";
import ProfileList from "./ProfileList";
import { currentUser } from "@/lib/authUser";
import { allTransactionData } from "@/backend/services/transaction";

const ProfileInfo = async () => {
  const user = await currentUser();

  const userId = user?.id || "";


  return (
    <>
      <BreadCamp />
      <div className="container mx-auto flex flex-col md:flex-row gap-6 pt-4 pb-16">
        <div className="w-full md:w-1/4">
          {user && <ProfileList user={user} />}
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {user && <PersonalInfo user={user} />}
            <ShipingAdress userId={userId} />
            <BillingAdress userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
