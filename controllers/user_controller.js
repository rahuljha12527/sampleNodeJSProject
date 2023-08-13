const User = require('../models/user'); // Assuming User model is in a separate file named User.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.signup = async (req, res) => {
  try {
    const { email, password, name, avatar } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      avatar,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};





module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and compare the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_STRING , { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports.profile=function(req,res){

    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        });
     });
  
}