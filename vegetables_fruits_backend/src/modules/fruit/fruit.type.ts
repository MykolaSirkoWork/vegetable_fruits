import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType('Fruit')
export class FruitType {
	@Field(type => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	price: number;
}