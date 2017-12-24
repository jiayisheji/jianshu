import { Component, Logger } from '@nestjs/common';

// 解析.env文件
import dotenv = require('dotenv');

import * as express from 'express';

import { Environments } from './shared/environments';

import { ExpressConfig, ExpressSettings } from './core';

export interface Configuration {
    configure(app: AppComponent): void;
}

@Component()
export class AppComponent {
    private readonly logger = new Logger(AppComponent.name);
    private app: express.Application = express();
    private appSettings = new ExpressSettings();
    private appConfig = new ExpressConfig();
    constructor() {
        Environments.isDev() ? dotenv.config() : null;
    }

    public bootstrap() {
        this.logger.log('Configuring Express Options');
        this.appSettings.expressAppSettings(this.app);
        this.appConfig.configure(this.app);
        return this.app;
    }
}