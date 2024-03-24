import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const signUpController = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { name, email, password } = req.body;
		if (!email || !password || !name) {
			return res.status(203).json({ message: "Please provide all required fields" });
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (existingUser) {
			return res.status(203).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: { name, email, hashedPassword },
		});
		
		const verificationToken = await prisma.verificationtoken.create({
			data: {
				identifier: user.email || '',
				token: generateVerificationToken(),
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
				userId: user.id,
			},
		});

		return res
			.status(200)
			.json({ message: "User registered successfully", user, verificationToken});
	} catch (err:any) {
		return res
			.status(203)
			.json({ message: "Internal server error", error: err.message});
	}
};

const loginController = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { email, password } = req.body;
0
		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!existingUser) {
			return res.status(203).json({ message: "User not found" });
		}

		const matched = await bcrypt.compare(password, existingUser.hashedPassword);

		if (!matched) {
			return res.status(203).json({ message: "Incorrect password" });
		}

		const accessToken = generateAccessToken({
			id: existingUser.id,
		});

		const refreshToken = generateRefreshToken({
			id: existingUser.id,
		});

		const sessionToken = generateSessionToken();

		res.cookie('accessToken', accessToken, { httpOnly: true, secure: false, path:'/', });
    	res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, path:'/', });
    	res.cookie('sessionToken', sessionToken, { httpOnly: true, secure: false, path:'/', });

		await prisma.user.update({
			where: {
				id: existingUser.id,
			},
			data: {
				access_token: accessToken,
				refresh_token: refreshToken,
			},
		});

		const session = await prisma.session.create({
			data: {
				sessionToken:sessionToken,
				userId: existingUser.id,
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			},
		});

		return res
			.status(200)
			.json({ message: "Login successful", accessToken, refreshToken, session });
	} catch (err:any) {
		return res
			.status(203)
			.json({ message: "Internal server error", details: err.message });
	}
};

const refreshAccessTokenController = async (req: Request, res: Response): Promise<Response> => {
	const { userId, refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).json({ error: "Refresh token is required" });
	}

	try {
		const decoded: any = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_PRIVATE_KEY as string
		);
		const id = decoded.id;

		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid refresh token" });
		}

		const newAccessToken = generateAccessToken({ id });

		return res.status(201).json({
			message: "Token refreshed successfully",
			accessToken: newAccessToken,
		});
	} catch (err:any) {
		return res
			.status(401)
			.json({ error: "Invalid refresh token", details: err.message });
	}
};

const logOutController = async (req: Request, res: Response): Promise<Response> => {
	try {
		if (!req.params.id) {
			return res.status(400).json({ error: "session not available" });
		}

		await prisma.session.deleteMany({
			where: {
				sessionToken: req.params.id,
			},
		});
		return res.status(200).json({ message: "Logged out successfully" });
	} catch (e:any) {
		return res
			.status(500)
			.json({ error: "Internal server error", details: e.message });
	}
};

const generateAccessToken = (data: any): string => {
	try {
		const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY as string, {
			expiresIn: "1h",
		});
		return token;
	} catch (e:any) {
		throw new Error("Failed to generate refresh token: " + e.message);

	}
};

const generateRefreshToken = (data: any): string => {
	try {
		const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY as string, {
			expiresIn: "1d",
		});
		return token;
	} catch (e:any) {
		throw new Error("Failed to generate refresh token: " + e.message);
	}
};

const generateVerificationToken = (): string => {
	return Math.random().toString(36).substring(2, 10);
};

const generateSessionToken = (): string => {
	return Math.random().toString(36).substring(2, 10);
};

const checkValidSession = async (req: Request, res: Response): Promise<Response> => {
	const sessionId  = req.params.id;
	try {
		const thisSession = await prisma.session.findUnique({
			where: { sessionToken:  sessionId },
		});
		if (thisSession) return res.status(200).json({success:"Is Logged In"});
		return res.status(401).json({error:"Not Logged In"});
	} catch (e:any) {
		return res.status(500).json({ error: "Session Expired", details: e.message });
	}
};

const getUserDetails = async (req: Request, res: Response): Promise<Response> => {
	const sessionId  = req.params.id;
	try {
		const thisSession : any = await prisma.session.findUnique({
			where: { sessionToken:  sessionId },
		});
		const thisUser = await prisma.user.findUnique({
			where : {
				id: thisSession.userId
			}
		});
		if(thisUser)
			return res.status(200).send(thisUser);
		else
			return res.status(500).json({ error: "No user found"});
	} catch (e:any) {
		return res.status(500).json({ error: "Session Expired", details: e.message });
	}
};

export {
	signUpController,
	loginController,
	logOutController,
	refreshAccessTokenController,
	checkValidSession,
	getUserDetails,
};
