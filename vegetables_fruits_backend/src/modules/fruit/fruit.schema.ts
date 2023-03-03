import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type FruitDocument = HydratedDocument<Fruit>;

@Schema()
export class Fruit {
	@Prop()
	id: string;

	@Prop()
	name: string;

	@Prop()
	price: number;
}

export const FruitSchema = SchemaFactory.createForClass(Fruit);