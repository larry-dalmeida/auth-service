import { Pool } from "pg";

class UserRepository {
  constructor(private db: Pool) {
    this.db = db;
  }

  async createUser(name: string, email: string, hashedPassword: string) {
    const result = await this.db.query(
      "INSERT INTO app.users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email, name",
      [name, email, hashedPassword]
    );

    return result.rows[0];
  }

  async getUserByEmail(email: string) {
    const result = await db.query("SELECT * FROM app.users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }
}

export default UserRepository
