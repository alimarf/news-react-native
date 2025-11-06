export interface User {
  id: string;
  email: string;
  name?: string;
}

export const DUMMY_USER: User = {
  id: '1',
  email: 'user@mail.com',
  name: 'User',
};

export const VALID_CREDENTIALS = {
  email: 'user@mail.com',
  password: 'user123456',
};

