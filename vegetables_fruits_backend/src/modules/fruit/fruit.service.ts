import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import {FruitDocument} from "./fruit.schema";
import {CreateFruitInput} from "./inputs/fruit.input";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {v4 as uuid} from 'uuid'
import {UpdateFruitInput} from "./inputs/updateFruit.input";

@Injectable()
export class FruitService {
	constructor(
		@InjectModel('Fruit') private fruitModel: Model<FruitDocument>
	) {
	}

	async createFruit(
		createFruitInput: CreateFruitInput
	): Promise<FruitDocument> {
		const fruit = new this.fruitModel({
			id: uuid(),
			...createFruitInput
		})
		return fruit.save();
	}

	async getFruit(id: string): Promise<FruitDocument> {
		const [fruit] = await this.fruitModel.find({id}).exec();
		if (!fruit) {
			throw new NotFoundException('Fruit not found');
		}
		return fruit;
	}

	async getAllFruits(): Promise<FruitDocument[]> {
		return this.fruitModel.find().exec();
	}

	async updateFruit(
		id: string,
		updateFruitInput: UpdateFruitInput
	): Promise<FruitDocument> {
		if (!Object.keys(updateFruitInput).length) {
			throw new NotAcceptableException('Must be specified at least one property to update')
		}
		const [fruit] = await this.fruitModel.find({id});
		if (!fruit) {
			throw new NotFoundException('Fruit not found');
		}
		return this.fruitModel.findOneAndUpdate({id}, updateFruitInput, {new: true})

	}

	async removeFruit(
		id: string
	): Promise<string> {
		const fruit = await this.fruitModel.find({id}).exec();
		if (!fruit) {
			throw new NotFoundException('Fruit not found');
		}
		await this.fruitModel.findOneAndRemove({id})
		return `fruit with ${id} has been removed`

	}
}
