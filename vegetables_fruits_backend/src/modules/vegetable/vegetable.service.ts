import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import {VegetableDocument} from "./vegetable.schema";
import {CreateVegetableInput} from "./inputs/vegetable.input";
import {v4 as uuid} from 'uuid'
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UpdateVegetableInput} from "./inputs/updateVegetable.input";

@Injectable()
export class VegetableService {
	constructor(
		@InjectModel('Vegetable') private vegetableModel: Model<VegetableDocument>
	) {
	}

	async createVegetable(
		createVegetableInput: CreateVegetableInput
	): Promise<VegetableDocument> {
		const vegetable = new this.vegetableModel({
			id: uuid(),
			...createVegetableInput
		})
		return vegetable.save()
	}

	async getVegetable(
		id: string
	): Promise<VegetableDocument> {
		const [vegetable] = await this.vegetableModel.find({id}).exec();
		if (!vegetable) {
			throw new NotFoundException('Fruit not found');
		}
		return vegetable
	}

	async getAllVegetables(): Promise<VegetableDocument[]> {
		return this.vegetableModel.find().exec()
	}

	async updateVegetable(
		id: string,
		updateVegetableInput: UpdateVegetableInput
	): Promise<VegetableDocument> {
		if (!Object.keys(updateVegetableInput).length) {
			throw new NotAcceptableException('Must be specified at least one property to update')
		}
		const vegetable = this.vegetableModel.findOne({id}).exec();
		if (!vegetable) {
			throw new NotFoundException('vegetable not found');
		}
		return this.vegetableModel.findOneAndUpdate({id}, updateVegetableInput, {new: true})
	}

	async removeVegetable(
		id: string
	): Promise<string> {
		const vegetable = this.vegetableModel.findOneAndRemove({id})
		if (!vegetable) {
			throw new NotFoundException('Vegetable not found');
		}
		await this.vegetableModel.findOneAndRemove({id})
		return `vegetable with ${id} has been removed`
	}


}
