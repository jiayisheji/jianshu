import { Component, Logger } from '@nestjs/common';

@Component()
export class MongooseConfig {
    private readonly logger = new Logger(MongooseConfig.name);

    public configure(): string {
        const mongoUser: string = process.env.MONGO_USER;
        const mongoPass: string = process.env.MONGO_PASS;
        const mongoDbport = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
        const mongoDbs: string = process.env.MONGO_DBS;

        this.logger.log('Configuring Mongoose Options');
        return `mongodb://${mongoUser}:${mongoPass}@${mongoDbport}/${mongoDbs}`;
    }
}