import WishlistItem from "./WishlistItem";

const WishlistList = () => {
  return (
    <div className="container gap-6 pt-4 pb-16">
      <div className="mx-auto space-y-4 max-w-6xl">
        <WishlistItem />
      </div>
    </div>
  );
};

export default WishlistList;
