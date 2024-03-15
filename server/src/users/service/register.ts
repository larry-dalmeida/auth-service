import bcrypt from "bcrypt";
import { addUser } from "../repository/index";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const result = await addUser(name, email, hashedPassword);
      res.status(201).send(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering the user");
    }
  };

  export default register;