import jwt, { type JwtPayload } from "jsonwebtoken";

interface DecodedAccessToken extends JwtPayload {
  exp: number;
  publicId: string;
  staffId: string;
  role: string;
  status: string;
  permissions: string[];
}

export function extractDataFromJwtToken(token: string) {
  const decodedAccessToken = jwt.decode(token) as DecodedAccessToken;

  const tokenExpires = decodedAccessToken.exp;
  const tokenSub = decodedAccessToken.sub;
  const tokenPublicId = decodedAccessToken.publicId;
  const tokenStaffId = decodedAccessToken.staffId;

  return { tokenExpires, tokenSub, tokenPublicId, tokenStaffId };
}
