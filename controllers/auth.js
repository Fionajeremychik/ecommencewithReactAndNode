
// Asynchronous I/O is a form of input/output processing that 
// permits other processing to continue before the transmission has finished.
export const users = async (req, res) => {
    res.json({
        data: 'Matthew under a router',
    });
};

export const register = async (req, res) => {
    console.log (req.body);
    try {
      // 1. destructure name, email, password from req.body in ES6 (destructuring)
      const { name, email, password } = req.body;
      // 2. all fields require validation
      if (!name.trim()) {
        return res.json({ error: "Name is required" });
      }
      if (!email) {
        return res.json({ error: "Email is taken" });
      }
      if (!password || password.length < 6) {
        return res.json({ error: "Password must be at least 6 characters long" });
      }
      // 3. check if email is taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ error: "Email is taken" });
      }
      // 4. hash password
      const hashedPassword = await hashPassword(password);
      // 5. register user
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();
      // 6. create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // 7. send response
      res.json({
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
        },
        token,
      });
    } catch (err) {
      console.log(err);
    }
};