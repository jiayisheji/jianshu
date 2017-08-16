/**
 * Created by jiayi on 2017/8/6.
 */
import * as redis from 'redis';
import {RedisClient} from 'redis';
const redisClient: RedisClient = redis.createClient(6379);

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

redisClient.on('connect', function () {
    console.log('Redis is ready');
});

export default {redis, redisClient};
