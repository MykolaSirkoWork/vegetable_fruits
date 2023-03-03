import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {VegetableType} from "./vegetable.type";
import {VegetableService} from "./vegetable.service";
import {CreateVegetableInput} from "./inputs/vegetable.input";
import {UpdateVegetableInput} from "./inputs/updateVegetable.input";
import {Roles} from "../../guards/roles.decorator";
import {RolesEnum} from "../user/roles.enum";
import {UseGuards} from "@nestjs/common";
import {RoleGuard} from "../../guards/role.guard";
import {AuthGuard} from "../../guards/auth.guard";

@UseGuards(AuthGuard)
@Resolver(of => VegetableType)
export class VegetableResolver {
	constructor(
		private vegetableService: VegetableService
	) {
	}

	@Query(returns => VegetableType)
	@Roles(RolesEnum.ADMIN, RolesEnum.VEGETARIAN_MARY, RolesEnum.FRUIT_JOHN)
	vegetable(
		@Args('id') id: string
	) {
		return this.vegetableService.getVegetable(id)
	}

	@Query(returns => [VegetableType])
	@Roles(RolesEnum.ADMIN, RolesEnum.FRUIT_JOHN, RolesEnum.VEGETARIAN_MARY)
	vegetables() {
		return this.vegetableService.getAllVegetables()
	}

	@Mutation(returns => VegetableType)
	@Roles(RolesEnum.ADMIN, RolesEnum.VEGETARIAN_MARY,RolesEnum.FRUIT_JOHN)
	@UseGuards(RoleGuard)
	createVegetable(
		@Args('createVegetableInput') createVegetableInput: CreateVegetableInput
	) {
		return this.vegetableService.createVegetable(createVegetableInput);
	}


	@Mutation(returns => VegetableType)
	@Roles(RolesEnum.ADMIN, RolesEnum.VEGETARIAN_MARY)
	@UseGuards(RoleGuard)
	updateVegetable(
		@Args('id') id: string,
		@Args('updateVegetableInput') updateVegetableInput: UpdateVegetableInput
	) {
		return this.vegetableService.updateVegetable(id, updateVegetableInput)
	}

	@Mutation(returns => String)
	@Roles(RolesEnum.ADMIN, RolesEnum.VEGETARIAN_MARY)
	@UseGuards(RoleGuard)
	removeVegetable(
		@Args('id') id: string
	) {
		return this.vegetableService.removeVegetable(id)
	}

}