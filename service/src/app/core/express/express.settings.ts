import { Component } from '@nestjs/common';

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { Environments } from '../../shared/environments';

@Component()
export class ExpressSettings {
    private isProd: any = false;
    public expressAppSettings(app: express.Application): express.Application {
        app.set('name', process.env.APP_NAME);
        app.set('prefix', process.env.APP_URL_PREFIX);
        app.set('swagger', process.env.APP_API_SWAGGER);
        app.set('host', process.env.APP_HOST);
        app.set('port', this.normalizedPort(process.env.APP_PORT || '3000'));
        return app;
    }

    public normalizedPort(port: string): number | string {
        const portAsNumber = parseInt(port, 10);
        if (isNaN(portAsNumber)) {
            return port;
        }
        if (portAsNumber >= 0) {
            return portAsNumber;
        }
        return;
    }
}