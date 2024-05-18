import accountModel from "./account.model";
import PasswordResetToken from "./passRest.model";
import TwoFactorConfirmationModel from "./TwoFactor-Confirmatio.model";
import TwoFactorTokenModel from "./TwoFactor-Token.model";
import userModel from "./user.model";
import verificationTokenModel from "./verification-Token.model";

export const db = {
  user: userModel,
  verificationToken: verificationTokenModel,
  passwordResetToken: PasswordResetToken,
  twoFactorToken: TwoFactorTokenModel,
  twoFactorConfirmation: TwoFactorConfirmationModel,
  account: accountModel,
};
