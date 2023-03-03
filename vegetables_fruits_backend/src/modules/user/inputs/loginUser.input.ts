import {Field, InputType} from "@nestjs/graphql";
import {IsString, MinLength} from "class-validator";

@InputType()
export class LoginUserInput {
	@MinLength(3)
	@IsString()
	@Field()
	name: string

	@IsString()
	@MinLength(6)
	@Field()
	password: string
}