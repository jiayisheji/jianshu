/** @nest */
import { Module } from '@nestjs/common';
/** Rxjs */

/** Libraries */

/** Dependencies */
import { SharedModule } from 'shared';
/** Component */
import { PublicService } from './public.service';
import { PublicController } from './public.controller';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [PublicController],
    providers: [PublicService],
})
export class PublicModule { }