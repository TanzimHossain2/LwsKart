import WishlistList from '@/components/product/CartWishlist'
import BreadCamp from '@/components/shared/breadCamp'
import { Suspense } from 'react'


const WishListPage = () => {
  return (
    <div>
        <BreadCamp />
        <Suspense fallback={<div>Loading...</div>}>
        <WishlistList />
        </Suspense>
    </div>
  )
}

export default WishListPage