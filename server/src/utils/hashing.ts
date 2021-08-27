import bcrypt from "bcrypt";


export function generateHash(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function isPasswordValid(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}
