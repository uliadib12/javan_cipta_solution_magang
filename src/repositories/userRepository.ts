import db from '../database/database';
import { User } from '../models/user';

export const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users';
    db.all(sql, [], (err, rows: User[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const createUser = (name: string, email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (name, email) VALUES (?,?)';
    db.run(sql, [name, email], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, email });
      }
    });
  });
};

export const getUserById = (id: number): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [id], (err, row: User) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const deleteUserById = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};