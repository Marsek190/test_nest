import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as randomstring from 'randomstring';
import * as path from 'path';
import * as session from 'express-session';
import * as config from '../config.json';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(session({
        secret: randomstring.generate(32),
        resave: false,
        saveUninitialized: true
    }));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.listen(config.port)
        .then(() => {
            console.log(`app run and listen ${config.port}`);
        })
        .catch(console.error);
}
bootstrap();
