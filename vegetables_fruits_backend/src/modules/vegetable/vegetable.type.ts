import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType('Vegetable')
export class VegetableType {
	@Field(type => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	price: number;
}