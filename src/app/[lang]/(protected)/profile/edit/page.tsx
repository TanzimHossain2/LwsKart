import { getUserById } from "@/backend/services/user";
import ProfileForm from "@/components/user/profile/ProfileForm";

const EditProfilePage = async ({ searchParams }: any) => {
  const { id } = searchParams;
  const user = await getUserById(id);

  return (
    <div className="container">
      {user && <ProfileForm user={user} />}
    </div>
  );
};

export default EditProfilePage;
