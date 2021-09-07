import jsonwebtoken from "jsonwebtoken";


export function issueJWT(user: any) {

  const payload = {
    sub: user._id,
    iat: Date.now()
  };

  const expiresInDays = 14;
  const expiresIn = 14 + "d";

  const token = jsonwebtoken.sign(payload, process.env["SECRET_KEY"] as string, { expiresIn: expiresIn });

  return {
    token: "Bearer " + token,
    expiresInDays: expiresInDays
  };

}
