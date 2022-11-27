const users = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
	return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"60s"});
}

function generateRefreshToken(user) {
	return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"1d"});
}

exports.checkLogged = async (req,res) => {
    try {
		const user = await users.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

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

		res.json({
			success: true,
			message: 'Account created successfully.'
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
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		//Update token
		const filter = { email: email };
		const update = { refreshToken: refreshToken };
		await users.findOneAndUpdate(filter, update);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
            secure: false,
			path: "/",
			sameSite: "strict",
		})
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

exports.requestRefreshToken = async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken)
		return res
			.status(401)
			.json({ success: false, message: 'Refresh token not found.' })

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err)
		{
			console.log(error)
			return res.status(403).json({ success: false, message: "You're not authenticated." })
		}
		newAccessToken = generateAccessToken(user);
	})

}

exports.logout = async (req,res) => {
	const token = req.cookies.refreshToken;
	res.clearCookie('refreshToken');
	const filter = { refreshToken: token };
	const update = { refreshToken: "" };
	await users.findOneAndUpdate(filter, update);
    return res.json({ success: true, message: 'Logged out successfully.' })
}