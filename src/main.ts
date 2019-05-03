import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as config from '../config.json';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.listen(config.port)
        .then(() => {
            console.log('app run and listen 3000');
        })
        .catch(console.error);
}
bootstrap();
