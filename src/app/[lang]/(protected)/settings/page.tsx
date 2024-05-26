import SettingForm from "@/components/auth/settingForm";
import { currentUser } from "@/lib/authUser";

const SettingsPage = async () => {
  const user  =await currentUser();
  return (
    <div className="container py-4">
      <h2 className="text-center text-xl font-semibold py-5">Update your account Information</h2>
     { user && <SettingForm user={user as any} /> }
    </div>
  );
};

export default SettingsPage;
