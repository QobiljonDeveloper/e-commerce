import { memo } from 'react';
import WishlistView from '../../components/wishlist-view';

const Wishlist = () => {
  return (
    <div className="Wishlist">
      <WishlistView/>
    </div>
  );
};

export default memo(Wishlist);