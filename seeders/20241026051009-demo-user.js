const CryptoJS = require('crypto-js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const generatePassword = (email, password) => {
      const salt = email;
      const crypt = CryptoJS.PBKDF2(password, salt, {
        keySize: 128 / 32,
        iterations: 1000,
      }).toString();
      return { password: crypt, salt: salt };
    };

    const { password } = generatePassword('admin@gmail.com', 'admin');

    return queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@gmail.com',
        password: password,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
