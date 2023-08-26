import AWS from 'aws-sdk';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import fs from 'fs';

const client = new AWS.SecretsManager({
  region: 'us-east-2',
});

(async () => {
  try {
    const logStream = fs.createWriteStream('.env', {flags: 'w'});
    const data: GetSecretValueResponse = await client.getSecretValue({ SecretId: process.env.npm_config_app_secrets }).promise();
    const parsedData = (data?.SecretString) ? JSON.parse(data.SecretString) : data.SecretString;

    for (const key in parsedData) {
        if (!parsedData.hasOwnProperty(key)) continue;
        logStream.write(`${key}=${parsedData[key]} \n`);
    }
    logStream.end();

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
})();
