import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';
import { UserToken } from './user-token';

@Injectable()
export class UserTokenService {
    constructor() { }

    public generateToken(): UserToken {
        const token: string = randomstring.generate(32);
        return new UserToken(token);
    }
}
