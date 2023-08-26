import { createClient } from 'redis';
import { number } from 'zod';

export interface UserSession {
    userId: string;
    walletSessionId?: string;
    walletPub?: string;
    message?: string;
    code?: number
}

export const REDIS_EXPIRY_TIME_IN_SECONDS:number = 3600*3;

export interface UserSession {
    userId: string;
    walletSessionId?: string;
    walletPub?: string;
    message?: string;
    code?: number
}

const redisClient = createClient({
    url: process.env.REDIS_SERVER_URL || 'redis://localhost:7070'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('REDIS CLIENT CONNECTED TO SERVER.'));

const setValue = (data: UserSession) => {
    const key = data.userId;
    redisClient.setEx(key, REDIS_EXPIRY_TIME_IN_SECONDS, JSON.stringify(data));
}

const setServiceAccountSession = (sessionId: string) => {
    const key = "service-account-session";
    redisClient.setEx(key, REDIS_EXPIRY_TIME_IN_SECONDS, sessionId);
}

const getServiceAccountSession = async () => {
    return await redisClient.get("service-account-session");
}

const getValue = async (key: string) => {
    const value = await redisClient.get(key);
    return JSON.parse(value);
}

(async () => {
    await redisClient.connect();
})();

export const RedisClient = {
    getValue,
    setValue,
    setServiceAccountSession,
    getServiceAccountSession

};