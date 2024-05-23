import Image from "next/image"
import Link from "next/link"
import Search from "../search/Search"
import { currentUser } from "@/lib/authUser";
import CartHeader from "./CartHeader";
import WishListHeader from "./WishListHeader";
import { PageDictionary } from "@/interfaces/lang";

interface props {
    dictionary: PageDictionary;
  }
  

const Header : React.FC<props> =async ({dictionary}) => {


  return (
    <header className="py-4 shadow-sm bg-white">
        <div className="container flex items-center justify-between">
            <Link href="/">
                <Image src="/images/logo.svg" alt="Logo" className="w-32" 
                width={40} height={40}
                 />
            </Link>

           <Search text={dictionary.search} />

            <div className="flex items-center space-x-4">

                <WishListHeader text={dictionary.wishlist} />
               <CartHeader text={dictionary.cart} />

                <Link href="/profile" className="text-center text-gray-700 hover:text-primary transition relative">
                    <div className="text-2xl">
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <div className="text-xs leading-3">
                    {dictionary.account}
                    </div>
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Header