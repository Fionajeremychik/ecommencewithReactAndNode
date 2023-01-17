import bcrypt from "bcrypt";

// When the Promise is returned to the caller, 
// it provides methods to handle the success or failure of the operation based on the condition.
export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      // Bcrypt uses salt to protect against attacks like rainbow table, brute force, and more.
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
