const users = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// exports.checkLogged = async (req,res) => {
//     try {
// 		const user = await users.findById(req.userId).select('-password')
// 		if (!user)
// 			return res.status(400).json({ success: false, message: 'User not found' })
// 		res.json({ success: true, user })
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// }

exports.register = async (req,res) => {

    const { name, email, password} = req.body
    if (!name || !email || !password)
    {
        return res
            .status(400)
            .json({ success: false, message: 'Missing information(s).' })
    }
    try {
		// Check for existing user
		let user = await users.findOne({ email: email })

		if (user)
        {
			return res
				.status(400)
				.json({ success: false, message: 'Email already taken.' })
        }
		// All good
		hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new users({ name, email, password: hashedPassword })
		await newUser.save()

		// Return token
		const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
		res.json({
			success: true,
			message: 'Account created successfully.',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error.' })
	}
}

exports.login = async (req,res) => {
    const { email, password } = req.body
    if (!email || !password)
    {
    return res
        .status(400)
        .json({ success: false, message: 'Missing information(s).' })
    }
    try {
		// Check for existing user
		const user = await users.findOne({ email})
		if (!user)
        {
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect email or password.' })
        }

		// Username found
		const passwordValid = await bcrypt.compare(password, user.password)
		if (!passwordValid)
        {
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect email or password.' })
        }

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully.',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error.' })
	}
}