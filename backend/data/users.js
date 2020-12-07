import bcrypt from 'bcryptjs';
const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'John Doe',
		email: 'jDoe@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Simas Zurauskauskas',
		email: 'simas@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
