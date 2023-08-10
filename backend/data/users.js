import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    phoneNumber: '09111111111',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    phoneNumber: '0922222222',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    phoneNumber: '0923333333',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;