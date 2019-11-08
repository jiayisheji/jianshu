import { Module } from '@nestjs/common';

import { RouterModule, Routes } from 'nest-router';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: '/api/v1',
    children: [
      {
        path: '/',
        module: AuthModule
      }
    ],
  },
];


@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AuthModule
  ]
})
export class AppRoutingModule { }
