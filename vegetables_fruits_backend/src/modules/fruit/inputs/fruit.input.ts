import {Field, InputType} from "@nestjs/graphql";
import {IsNumber, IsString, MinLength} from "class-validator";

@InputType()
export class CreateFruitInput {
	@MinLength(2)
	@IsString()
	@Field()
	name: string;

	@IsNumber()
	@Field()
	price: number;
}