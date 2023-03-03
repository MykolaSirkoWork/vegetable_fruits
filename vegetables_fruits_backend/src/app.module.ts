import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {VegetableModule} from './modules/vegetable/vegetable.module';
import {FruitModule} from './modules/fruit/fruit.module';
import {UserModule} from './modules/user/user.module';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {MongooseModule} from "@nestjs/mongoose";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./guards/auth.service";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";
import {ConfigModule} from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRoot(process.env.MONGO_URI + ''),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: true,
			driver: ApolloDriver,
		}),
		{
			...JwtModule.register({
				secret: process.env.JWT_SECRET,
				signOptions: {expiresIn: process.env.JWT_EXPIRES_IN}
			}),
			global: true
		},
		VegetableModule,
		FruitModule,
		UserModule,
	],
	providers: [
		AuthService,
		// {
		// 	provide: APP_GUARD,
		// 	useClass: AuthGuard,
		// },
		// {
		// 	provide: APP_GUARD,
		// 	useClass: RoleGuard
		// }
	],
	exports: [JwtModule]
})
export class AppModule {
}
