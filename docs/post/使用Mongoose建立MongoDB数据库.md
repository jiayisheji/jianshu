# 使用 Mongoose 建立 MongoDB 数据库

学习如何创建 `API` 时的下一个重要事项是如何存储数据。在本文中，我们研究了如何使用 [MongoDB](https://www.mongodb.com/) 和 `NestJS` 进行。要使数据库管理更方便，我们使用名为 [Mongoose](https://mongoosejs.com/) 的对象关系映射（ORM）工具。要有更好的理解，我们还会介绍一些 `MongoDB` 查询。通过这样做，我们可以掌握 ORM 给我们的优势。

## 建立 MongoDB 数据库

使用 MongoDB 数据库启动我们的开发的最直接的方法是使用 `Docker`。

首先要做的是安装 [Docker](https://docs.docker.com/get-docker/) 和 [Docker Compose](https://docs.docker.com/compose/install/)。现在，我们需要创建一个 `docker-compose.yml` 文件并运行它。

docker-compose.yml

```yml
version: '3.8'
services:
  db:
    container_name: mongodb
    image: mongo
    ports:
      - '27017:27017'
    command: [--auth]
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
      MONGO_INITDB_DATABASE: ${MONGO_DATABASE}
      MONGO_USERNAME: ${MONGO_USERNAME}
      MONGO_PASSWORD: ${MONGO_PASSWORD}
    volumes:
      - ./.docker/mongo_data:/data/db
      - ./.deploy/docker/mongo-init.sh:/docker-entrypoint-initdb.d/mongo-init.sh
```

要提供我们的 `Docker` 容器使用的凭据，我们需要创建 `.env` 文件。 通过将其添加到 `.gitignore` 来跳过它。

```bash
cp .env.example .env
```

根据内容修改想要的对应值

.env

```env
MONGO_DATABASE=jianshu
MONGO_USERNAME=jianshu
MONGO_PASSWORD=jianshu
```

创建一个初始化脚本 `mongo-init.sh`

```sh
mongo -- "$MONGO_INITDB_DATABASE" <<EOF
db = db.getSiblingDB('admin')
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')
db = db.getSiblingDB('$MONGO_INITDB_DATABASE')
db.createUser({user: '$MONGO_USERNAME',pwd: '$MONGO_PASSWORD',roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }]})
EOF
```

这个脚本帮我们初始化时，自动验证数据库管理员，并且创建对应的数据库和管理员。

> **Windows 用户注意**：创建完这个文件，记得使用 `dos2unix` 这个命令，将文件转换成的 unix 系统可读的。

一旦上面所有的设置完成，我们需要启动容器:

```bash
docker-compose up -d
```

## 环境变量

运行应用程序的关键是设置环境变量。通过使用它们来保存配置数据，我们可以轻松配置。 此外，还可以更容易地避免将敏感数据提交到存储库。

在 `Nodejs` 中，我们使用一个名为 [dotenv](https://github.com/motdotla/dotenv) 的库来注入变量。在 `NestJS` 中，我们有一个可以在我们的应用程序中使用的 `ConfigModule`。它在内部使用 `dotenv`。

```bash
npm install @nestjs/config
```

app.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

一旦我们在应用程序的根目录下创建了一个 `.env` 文件，NestJS 就会将它们注入到我们即将使用的 `configService` 中。

### 验证环境变量

在运行应用程序之前验证我们的环境变量是一个很好的想法。

嵌在 `NestJS` 中的 `ConfigModule` 支持 [joi](https://github.com/sideway/joi)，我们可以用它来定义验证模式。

```bash
npm install joi
```

app.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { number, object, string } from 'joi';

@Module({
  imports: [ConfigModule.forRoot(
    validationSchema: object({
      MONGO_DATABASE: string().required(),
      MONGO_USERNAME: string().required(),
      MONGO_PASSWORD: string().required(),
      MONGO_HOST: string().hostname().default('localhost'),
      MONGO_PORT: number().port().default(27017),
    })
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## 使用 MongoDB 连接 NestJS 应用程序

一旦我们拥有我们的数据库运行，就可以做的第一件事是在我们的应用程序和数据库之间定义连接。 为此，我们使用 `MongooseModule`。

```bash
npm install @nestjs/mongoose mongoose
```

为了保持代码整洁，我建议创建一个配置数据库的模块。

database.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb://${config.get('MONGO_USERNAME')}:${config.get('MONGO_PASSWORD')}@${config.get('MONGO_HOST')}:${config.get(
          'MONGO_PORT',
        )}/${config.get('MONGO_DATABASE')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
```

上面提到的一件重要的事情是，我们使用了 `ConfigModule` 和 `ConfigService`。通过提供导入和注入数组，`useFactory` 方法可以访问环境变量。我们将在本系列的后续部分详细介绍这些机制。

现在，我们需要导入数据库模块。

app.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { number, object, string } from 'joi';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      validationSchema: object({
        MONGO_DATABASE: string().required(),
        MONGO_USERNAME: string().required(),
        MONGO_PASSWORD: string().required(),
        MONGO_HOST: string().hostname().default('localhost'),
        MONGO_PORT: number().port().default(27017),
      })
    ),
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Schemas

在使用 `Mongoose` 时，需要掌握的最关键的概念是 `Schemas`。它是一种以文件形式存储的数据库模型骨架。要创建它，我们可以使用 `@nestjs/mongoose` 提供的 `@Schema()` 装饰器。

我们创建一个 user.schema.ts

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
  toObject: {
    virtuals: true,
    getters: true,
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
})
export class User {
  @prop({
    type: String,
    unique: true,
  })
  username: string;

  @prop({ type: String })
  password: string;

  @prop({
    type: String,
    unique: true,
  })
  email: string;
}

export type UserDocument = User & Document;
export type UserModel = Model<User>;
export const UserSchema = SchemaFactory.createForClass(User);
// 让 mongoose 支持 es6 class
UserSchema.loadClass(User);
```

## Repositories

使用存储库，我们可以管理特定的 `Schema`。存储库具有与 `Schema` 交互的多种功能。要访问它，我们再次使用 `MongooseModule`。

我们先需要理解一下 `Schema`、`Model`、`Document` 的关系。

- Schema: 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
- Model: 由 Schema 发布生成的模型，具有抽象属性和数据库操作能力
- Document: 由 Model 创建的实例, 也能操作数据库

`Schema` 生成 `Model`，`Model` 创造 `Document`，`Model` 和 `Document` 都可对数据库操作造成影响，但 `Model` 比 `Document` 更具操作性。

users.module.ts

```ts
import { Module } from '@nestjs/common';
import UsersController from './users.controller';
import UsersService from './users.service';
import { User, UserSchema } from './user.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MongooseModule.forFeature([name: User.name, schema: UserSchema])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

现在，在我们的 `UsersService` 中，我们可以注入 `Users` 存储库。

```ts
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly _userModel: UserModel) {}
}
```

### 查找

使用 `find` 方法，可以获得多个元素。如果我们没有提供任何选项，它将返回所有。

```ts
getAllUsers() {
  return this._userModel.find();
}
```

要仅获得一个元素，我们使用 `findById` 方法。通过提供一个 `ObjectId`，指示我们希望具有特定 `ID` 的元素。如果结果 `undefined`，则意味着找不到元素。

```ts
async getUserById(id: string) {
  const user = await this._userModel.findById(id);
  if (user) {
    return user;
  }
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}
```

### 创建

通过使用 `new Model`，我们可以实例化一个新的 `User`。之后，我们可以使用 `save` 方法用我们的新 `Document` 填充到数据库。

```ts
async createUser(user: CreateUserDto) {
  const newUser = new this._userModel(user);
  await newUser.save(newUser);
  return newUser;
}
```

### 修改

要修改现有元素，可以使用 `findByIdAndUpdate` 方法。配置 `{ new: true }` 之后，该方法返回修改后的元素。

```ts
async updateUser(id: string, user: UpdateUserDto) {
  const newUser = await this._userModel.findByIdAndUpdate(id, user, { new: true });
  return newUser;
}
```

### 删除

```ts
async deleteUser(id: string) {
  const deleteResponse = await this._userModel.findByIdAndDelete(id);
  if (!deleteResponse) {
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
```

通过删除命名，我们会直接删除文档，这种操作叫物理删除。有时候我们需要假设元素不存在，这种操作叫逻辑删除，逻辑删除实际在当前文档标记 `deleted` 字段。正常情况下，无法查询该文档结果。

通过查看 `DELETE` 命令的文档，我们可以看到我们可以访问删除元素的计数。此数据可在受影响的属性中使用。如果它等于零，我们可以假设元素不存在。

## 结语

在本文中，我们已经学习了将我们的 `NestJS` 应用程序与 `MongoDB` 数据库连接的基础知识。我们不仅使用了 `Mongoose`，而且还研究了一些简单方法。`NestJS` 和 `Mongoose` 有很多内置的特性，可以随时使用。在本系列的后续部分中，我们将进一步研究它们，请继续关注。
