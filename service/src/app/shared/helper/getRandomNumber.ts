import { Component, Logger } from '@nestjs/common';

@Component()
export class GeneratRandom {
    private readonly logger = new Logger(GeneratRandom.name);

    public size(n: number): Promise<string> {
        let code: string = (Math.random() * Date.now() / 1000000).toFixed(0).slice(0, n);
        const length = code.length;
        if (length === n) {
            return Promise.resolve(code);
        }
        code = code + Array(n - length).fill(0).join('');
        return Promise.resolve(code);
    }

    public range(satrt: number, end: number): Promise<number> {
        this.logger.log('Configuring Mongoose Options');
        return Promise.resolve(100);
    }
}