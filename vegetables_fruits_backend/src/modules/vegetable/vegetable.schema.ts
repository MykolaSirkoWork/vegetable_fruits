import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type VegetableDocument = HydratedDocument<Vegetable>;

@Schema()
export class Vegetable {
	@Prop()
	id: string;

	@Prop()
	name: string;

	@Prop()
	price: number;
}

export const VegetableSchema = SchemaFactory.createForClass(Vegetable);