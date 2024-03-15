export const addUser = async (name: string, email: string, hashedPassword: string) => {
  const result = await db.query(
    "INSERT INTO app.users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email, name",
    [name, email, hashedPassword]
  );

  return result;
};

export const getUserByEmail = async (email: string) => {
  const result = await db.query("SELECT * FROM app.users WHERE email = $1", [email]);
  return result;
};