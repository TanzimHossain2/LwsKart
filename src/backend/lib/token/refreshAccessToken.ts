import jwt from "jsonwebtoken";

const secret = process.env.AUTH_SECRET as string;

export const refreshAccessToken = async (refresh_token: string) => {
  try {
    const decode: jwt.JwtPayload = jwt.verify(
      refresh_token,
      secret
    ) as jwt.JwtPayload;

    if (!decode) {
      return null;
    }

    const access_token = jwt.sign(
      { sub: decode.sub, email: decode.email, role: decode.role },
      secret,
      {
        expiresIn: "1h",
      }
    );

    return {
      access_token,
      refresh_token,
      expires_in: 3600,
    };
    
  } catch (err) {
    if ((err as Error).name === "TokenExpiredError") {
      console.error("Refresh token has expired", err);
    } else {
      console.error("Error refreshing access token", err);
    }
    return null;
  }
};
