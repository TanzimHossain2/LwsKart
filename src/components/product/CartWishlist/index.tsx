import WishlistItem from "./WishlistItem";



const WishlistList = ({dictionary}:any) => {
  return (
    <div className="container gap-6 pt-4 pb-16">
      <div className="mx-auto space-y-4 max-w-6xl">
        <WishlistItem dictionary={dictionary} />
      </div>
    </div>
  );
};

export default WishlistList;
