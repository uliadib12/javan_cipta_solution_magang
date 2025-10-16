
import { users } from '../database/database';
import { User } from '../models/user';

export const getAllUsers = (): Promise<User[]> => {
  return Promise.resolve(users);
};

export const createUser = (name: string, email: string): Promise<User> => {
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  return Promise.resolve(newUser);
};

export const getUserById = (id: number): Promise<User | null> => {
  const user = users.find((user) => user.id === id);
  return Promise.resolve(user || null);
};

export const deleteUserById = (id: number): Promise<void> => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
  return Promise.resolve();
};
