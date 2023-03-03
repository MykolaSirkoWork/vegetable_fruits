import {Injectable, NotAcceptableException} from '@nestjs/common';
import {UserDocument} from "./user.schema";
import {CreateUserInput} from "./inputs/user.input";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {v4 as uuid} from 'uuid'
import * as bcrypt from 'bcrypt'
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(
		@InjectModel('User') private userModel: Model<UserDocument>,
		private jwtService: JwtService
	) {
	}

	async createUser(
		{name, password, role}: CreateUserInput
	) {
		const user = await this.userModel.findOne({name}).exec()
		if (user) {
			throw new NotAcceptableException('user with this name already exists')
		}
		const hashedPassword = await this.hashPassword(password)
		const userDB = new this.userModel({
			id: uuid(),
			name,
			password: hashedPassword,
			role,
		})
		const createdUser = await userDB.save()
	
		console.log(createdUser)
		const accessToken = await this.getAccessToken({id: createdUser.id, role: createdUser.role})
		console.log(
			{
				...userDB,
			accessToken
			}, 'sasfasdfdsgdfgdfgdfgdf'
		)
		return {
			...userDB.toObject(),
			accessToken
		}
	}

	async loginUser({name, password}) {
		const user = await this.userModel.findOne({name},).lean().exec()
		if (!user) {
			throw new NotAcceptableException('invalid credentials')
		}
		const isPasswordMatch = await this.comparePasswords(password, user.password)
		if (!isPasswordMatch) {
			throw new NotAcceptableException('invalid credentials')
		}
		const accessToken = await this.getAccessToken({id: user.id, role: user.role})
		delete user.password
		delete user._id;
		delete user.__v
		return {
			...user,
			accessToken
		}
	}

	private async hashPassword(password: string) {
		return bcrypt.hash(password, 10)
	}

	private async comparePasswords(password: string, hash: string) {
		return bcrypt.compareSync(password, hash)
	}

	private async getAccessToken(payload) {
		return this.jwtService.sign(payload)

	}


}
