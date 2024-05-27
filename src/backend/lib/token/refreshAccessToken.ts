import jwt from "jsonwebtoken";

const secret = process.env.AUTH_SECRET as string;

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decode: jwt.JwtPayload = jwt.verify(
      refreshToken,
      secret
    ) as jwt.JwtPayload;

    if (!decode) {
      return null;
    }

    const accessToken = jwt.sign(
      { sub: decode.sub, email: decode.email, role: decode.role },
      secret,
      {
        expiresIn: "15m",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (err) {
    if ((err as Error).name === "TokenExpiredError") {
      console.error("Refresh token has expired");
    } else {
      console.error("Error refreshing access token", err);
    }
    return null;
  }
};
