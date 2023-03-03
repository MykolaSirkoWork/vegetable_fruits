import {Module} from '@nestjs/common';
import {FruitResolver} from "./fruit.resolver";
import {FruitService} from './fruit.service';
import {FruitSchema} from "./fruit.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthService} from "../../guards/auth.service";

@Module({
	imports: [
		MongooseModule.forFeature([{name: 'Fruit', schema: FruitSchema}]),
		AuthService
	],
	providers: [
		FruitResolver,
		FruitService,
		AuthService,
	]
})
export class FruitModule {
}
