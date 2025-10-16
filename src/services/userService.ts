import * as userRepository from '../repositories/userRepository';
import { User } from '../models/user';

export const getAllUsers = (): Promise<User[]> => {
  return userRepository.getAllUsers();
};

export const createUser = (name: string, email: string): Promise<User> => {
  return userRepository.createUser(name, email);
};

export const getUserById = (id: number): Promise<User | null> => {
  return userRepository.getUserById(id);
};

export const deleteUserById = (id: number): Promise<void> => {
  return userRepository.deleteUserById(id);
};