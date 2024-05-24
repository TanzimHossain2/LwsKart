import accountModel from "./user/account.model";
import PasswordResetToken from "./user/passRest.model";
import ProductModel from "./product/product.model";
import TwoFactorConfirmationModel from "./user/TwoFactor-Confirmatio.model";
import TwoFactorTokenModel from "./token/TwoFactor-Token.model";
import verificationTokenModel from "./token/verification-Token.model";
import userModel from "./user/user.model";
import CategoryModel from "./product/category.model";
import VariantModel from "./product/variant.model";
import ReviewModel from "./product/review.model";
import WishlistModel from "./product/wishlist.model";
import CartModel from "./product/cart.model";
import { BillingAddressModel,ShippingAddressModel } from "./user/adress.model";
import OrderModel from "./transaction/order.model";

export const db = {
  user: userModel,
  verificationToken: verificationTokenModel,
  passwordResetToken: PasswordResetToken,
  twoFactorToken: TwoFactorTokenModel,
  twoFactorConfirmation: TwoFactorConfirmationModel,
  account: accountModel,
  product: ProductModel,
  category: CategoryModel,
  variant: VariantModel,
  review: ReviewModel,
  wishlist: WishlistModel,
  cart: CartModel,
  billingAddress: BillingAddressModel,
  shippingAddress: ShippingAddressModel,
  order: OrderModel,
};
