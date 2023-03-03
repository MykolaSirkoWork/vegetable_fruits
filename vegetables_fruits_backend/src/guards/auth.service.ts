import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService{
	constructor(
		private jwtService: JwtService,
	) {
	}
	async verifyUser(token) {
		if(!token){
			throw new UnauthorizedException('unauthorized')
		}
		const data = await this.jwtService.verifyAsync(token)
		if(!data){
			throw new UnauthorizedException('unauthorized')
		}
		return true
	}

	async defineUserRole(token, roles){
		if (!token) {
			return false; // user not authenticated
		}
		const user = await this.jwtService.verifyAsync(token)
		return roles.includes(user.role); // check if user role is allowed
	}
}