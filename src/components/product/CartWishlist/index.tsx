import CartWishlistItem from "./CartWishlistItem";

const CartWishlistList = () => {
  return (
    <div className="container gap-6 pt-4 pb-16">
      <div className="mx-auto space-y-4 max-w-6xl">
        <CartWishlistItem />
      </div>
    </div>
  );
};

export default CartWishlistList;
