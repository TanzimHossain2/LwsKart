import LogoutButton from "@/components/auth/LogoutButton";
import Link from "next/link";

const ProfileList = () => {
  return (
    <>
      <ul className="py-4 mx-4 flex flex-col gap-1">

        <li className="shadow-md bg-white rounded-md p-4 hover:bg-gray-200">
          <Link href="/profile">Profile</Link>
          </li>

        <li className="shadow-md bg-white rounded-md p-4 hover:bg-gray-200">
          <Link href="/settings">Settings</Link>
        </li>

        <li className="shadow-md bg-white rounded-md p-4 hover:bg-gray-200">
          <Link href="/admin/add-product">Add Product</Link>
        </li>

        <li className="shadow-md bg-white rounded-md p-4 hover:bg-gray-200">
          <Link href="/admin/add-categories">Add Category</Link>
        </li>
 
        <li className="shadow-md bg-white rounded-md p-4 hover:bg-gray-200">
          <Link href="/orders">Orders</Link> 
          </li>
        <li className="shadow-md rounded-md p-4 bg-gray-400 ">
          <LogoutButton>Logout</LogoutButton>
          </li>
      </ul>
    </>
  );
};

export default ProfileList;