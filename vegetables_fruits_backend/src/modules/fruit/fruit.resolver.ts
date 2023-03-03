import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {FruitType} from "./fruit.type";
import {FruitService} from "./fruit.service";
import {CreateFruitInput} from "./inputs/fruit.input";
import {UpdateFruitInput} from "./inputs/updateFruit.input";
import {UseGuards} from "@nestjs/common";
import {Roles} from "../../guards/roles.decorator";
import {RolesEnum} from "../user/roles.enum";
import {RoleGuard} from "../../guards/role.guard";
import {AuthGuard} from "../../guards/auth.guard";

@UseGuards(AuthGuard)
@Resolver(of => FruitType)
export class FruitResolver {
	constructor(
		private fruitService: FruitService
	) {
	}

	@Query(returns => FruitType)
	@Roles(RolesEnum.ADMIN, RolesEnum.VEGETARIAN_MARY, RolesEnum.FRUIT_JOHN)
	fruit(
		@Args('id') id: string,
	) {
		return this.fruitService.getFruit(id)
	}

	@Query(returns => [FruitType])
	@Roles(RolesEnum.ADMIN, RolesEnum.VEGETARIAN_MARY, RolesEnum.FRUIT_JOHN)
	fruits() {
		return this.fruitService.getAllFruits()
	}

	@Mutation(returns => FruitType)
	@Roles(RolesEnum.ADMIN, RolesEnum.FRUIT_JOHN,  RolesEnum.VEGETARIAN_MARY)
	@UseGuards(RoleGuard)
	createFruit(
		@Args('createFruitInput') createFruitInput: CreateFruitInput
	) {
		return this.fruitService.createFruit(createFruitInput);
	}

	@Mutation(returns => FruitType)
	@Roles(RolesEnum.ADMIN, RolesEnum.FRUIT_JOHN)
	@UseGuards(RoleGuard)
	updateFruit(
		@Args('id') id: string,
		@Args('updateFruitInput') updateFruitInput: UpdateFruitInput,
	) {
		// console.log(context, 'context')
		return this.fruitService.updateFruit(id, updateFruitInput)
	}

	@Mutation(returns => String)
	@Roles(RolesEnum.ADMIN, RolesEnum.FRUIT_JOHN)
	@UseGuards(RoleGuard)
	removeFruit(
		@Args('id') id: string
	) {
		return this.fruitService.removeFruit(id)
	}
}