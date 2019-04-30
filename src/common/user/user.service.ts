import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';

@Injectable()
export class UserService {
    private users = [
        new User('admin@admin.ru', '12345678'),
        new User('user@user.ru', '87654321'),
        new User('test@testing.ru', '07654321'),
    ];

    constructor(
        private readonly userTokenService: UserTokenService,
    ) { }

    public findUser(data: any): User {
        const { email, password } = data;
        return this.users.find((user: User) => {
            return user.email == email && user.password == password;
        });
    }

    public getTokenUser(data: any): any {
        const user: User = this.findUser(data);
        if (user) {
            const { token } = this.userTokenService.generateToken();
            return { token };
        }
        return {
            statusCode: 401,
            error: "Unauthorized"
        };
    }
}
