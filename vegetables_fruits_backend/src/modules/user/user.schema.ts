import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {RolesEnum} from "./roles.enum";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop()
	id: string;

	@Prop()
	name: string;

	@Prop()
	role: RolesEnum;

	@Prop()
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);