import {Field, InputType} from "@nestjs/graphql";
import {RolesEnum} from "../roles.enum";
import {IsEnum, IsString, MinLength} from "class-validator";

@InputType()
export class CreateUserInput {
	@MinLength(3)
	@IsString()
	@Field()
	name: string

	@Field()
	@IsEnum(RolesEnum)
	role: RolesEnum

	@IsString()
	@MinLength(6)
	@Field()
	password: string
}