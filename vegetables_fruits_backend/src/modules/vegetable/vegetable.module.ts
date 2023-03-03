import {Module} from '@nestjs/common';
import {VegetableResolver} from "./vegetable.resolver";
import {VegetableService} from './vegetable.service';
import {VegetableSchema} from "./vegetable.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthService} from "../../guards/auth.service";


@Module({
	imports: [
		AuthService,
		MongooseModule.forFeature([{name: 'Vegetable', schema: VegetableSchema}])
	],
	providers: [
		VegetableResolver,
		VegetableService,
		AuthService
	]
})
export class VegetableModule {
}
