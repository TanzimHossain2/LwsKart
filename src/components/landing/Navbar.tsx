import { auth } from "@/auth";
import { Dictionary } from "@/interfaces/lang";
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";
import NavbarCategory from "./navbar/NavbarCategory";
interface props {
  dictionary: Dictionary;
}

const Navbar: React.FC<props> = async ({ dictionary }) => {
  const session = await auth();
  const isLogged = session?.user ? true : false;

  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
          <span className="text-white">
            <i className="fa-solid fa-bars"></i>
          </span>
          <span className="capitalize ml-2 text-white ">
            {dictionary.page.allCategories}
          </span>
          <NavbarCategory />
        </div>

        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-6 capitalize">
            <Link
              href="/"
              className="text-gray-200 hover:text-white transition"
            >
              {dictionary.page.home}
            </Link>
            <Link
              href="/shop"
              className="text-gray-200 hover:text-white transition"
            >
              {dictionary.page.shop}
            </Link>
            <Link
              href="/about-us"
              className="text-gray-200 hover:text-white transition"
            >
              {dictionary.page.about}
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-200 hover:text-white transition"
            >
              {dictionary.page.contact}
            </Link>
          </div>

          {isLogged ? (
            <>
              <LogoutButton>{dictionary.auth.logout}</LogoutButton>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="text-gray-200 hover:text-white transition"
            >
              {dictionary.auth.login}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
