import {RolesEnum} from "./roles.enum";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType('User')
export class UserType {
	@Field(type => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	role: RolesEnum

	@Field()
	accessToken: string
}