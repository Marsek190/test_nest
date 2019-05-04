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

    public findUser(data: any): Promise<User> {
        return new Promise((resolve, reject) => {
            const { email, password } = data;
            (!(email || password)) ? reject(new Error('incorrect email or password'))
            : resolve(
                this.users.find((user: User) => {
                    return user.email == email && user.password == password;
                })
            );
        });
    }

    public async getTokenUser(data: any): Promise<any> {
        try {
            const user: User = await this.findUser(data);
            if (user) {
                const { token } = this.userTokenService.generateToken();
                return { token };
            }
            return {
                statusCode: 401,
                error: "Unauthorized"
            };
        } catch (e) {
            // прокидываем в catch
            throw e;
        }
    }
}
