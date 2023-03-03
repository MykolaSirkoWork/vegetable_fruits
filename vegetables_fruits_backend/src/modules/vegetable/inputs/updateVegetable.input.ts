import {Field, InputType} from "@nestjs/graphql";
import {IsNumber, IsOptional, IsString, MinLength} from "class-validator";

@InputType()
export class UpdateVegetableInput {
	@MinLength(2)
	@IsString()
	@IsOptional()
	@Field({nullable: true})
	name?: string;

	@IsNumber()
	@IsOptional()
	@Field({nullable: true})
	price?: number;
}