import Database from "../app/db";

class UserRepository {
  constructor(private db: Database) {
    this.db = db;
  }

  async createUser(email: string, hashedPassword: string) {
    const result = await this.db.query(
      "INSERT INTO app.users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword],
    );

    return result.rows[0];
  }

  async getUserByEmail(email: string) {
    const result = await db.query("SELECT * FROM app.users WHERE email = $1", [
      email,
    ]);
    return result.rows.length === 0 ? null : result.rows[0];
  }
}

export default UserRepository;
