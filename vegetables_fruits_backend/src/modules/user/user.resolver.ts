import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserType} from "./user.type";
import {UserService} from "./user.service";
import {CreateUserInput} from "./inputs/user.input";
import {LoginUserInput} from "./inputs/loginUser.input";

@Resolver(of => UserType)
export class UserResolver {
	constructor(
		private userService: UserService
	) {
	}

	@Query(returns => UserType)
	async login(
		@Args('loginUserInput') loginUserInput: LoginUserInput
	) {
		return this.userService.loginUser(loginUserInput)

	}

	@Mutation(returns => UserType)
	createUser(
		@Args('createUserInput') createUserInput: CreateUserInput
	) {
		console.log(createUserInput)
		console.log('dfdfdfdf')
		return this.userService.createUser(createUserInput);
	}

}