import { Request, Response } from 'express';
import * as userService from '../services/userService';
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ status: 'success', message: 'Users retrieved successfully', data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed', message: 'Internal Server Error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ status: 'failed', message: error.details[0].message });
    }
    const { name, email } = req.body;
    const newUser = await userService.createUser(name, email);
    res.status(201).json({ status: 'success', message: 'User created successfully', data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed', message: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ status: 'failed', message: 'Invalid ID' });
    }
    const user = await userService.getUserById(id);
    if (user) {
      res.status(200).json({ status: 'success', message: 'User retrieved successfully', data: user });
    } else {
      res.status(404).json({ status: 'failed', message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed', message: 'Internal Server Error' });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ status: 'failed', message: 'Invalid ID' });
    }
    await userService.deleteUserById(id);
    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed', message: 'Internal Server Error' });
  }
};