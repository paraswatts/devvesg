import crypto from 'crypto';
import { NextFunction, Response } from 'express';
import multer from 'multer';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';

import { User, UserTypes } from '../entities';
import { AuthenticationError } from '../classes/errors';
import { AuthorizationError } from '../classes/errors';
import { ApprovalStatuses } from '../enums';

const MEGABYTE_IN_BYTES = 1000000;
const DOCUMENT_SIZE_LIMIT_IN_MEGABYTES = 5;
const IMAGE_SIZE_LIMIT_IN_MEGABYTES = 1;

export function isValidPassword(password: string, hash: string, salt: string) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return hash === hashVerify;
}

export function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt,
    hash,
  };
}

export function generateHashOfString(value: string) {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(value, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt,
    hash,
  };
}

export function generateJWT(user: User) {
  const uuid = user.uuid;
  const expiresIn = '1d';

  const payload = {
    uuid,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn, algorithm: 'HS256' });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}
export const getMulterImageConfig = () => {
  const storage = multer.memoryStorage();

  return multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'));
      }
      callback(null, true);
    },
    limits: {
      fileSize: MEGABYTE_IN_BYTES * IMAGE_SIZE_LIMIT_IN_MEGABYTES,
    },
  });
};

export const getMulterDocumentConfig = () => {
  const storage = multer.memoryStorage();

  return multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
        return callback(new Error('Only PDFs, Docs, and DocXs are allowed'));
      }
      callback(null, true);
    },
    limits: {
      fileSize: MEGABYTE_IN_BYTES * DOCUMENT_SIZE_LIMIT_IN_MEGABYTES,
    },
  });
};

export const userHasType =
  (types: string[], bypassApprovalStatus?: boolean) => (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AuthenticationError();
    }

    const hasType = types.find((role) => (req.user as User).type === role);
    if (!hasType) {
      throw new AuthorizationError();
    }

    if (
      req.user.type === UserTypes.PARTNER &&
      req.user.approvalStatus !== ApprovalStatuses.APPROVED &&
      !bypassApprovalStatus
    ) {
      throw new AuthorizationError();
    }

    next();
  };

export function validateCode(code: string) {
  const VALID_CODES = ['GREENBLOCKCHAIN', 'NONE'];
  return !code || VALID_CODES.includes(code.trim().toUpperCase());
}

export function createSHA256(string: string) {
  return crypto.createHash('sha256').update(string).digest('hex');
}

export function generateWalletPassword(password: string, username: string) {
  const walletPassword = createSHA256(password + username.toLocaleLowerCase());
  return walletPassword;
}

export function generateWalletEmailHash(password: string, email: string) {
  const walletEmailHash = createSHA256(password + email.toLocaleLowerCase());
  return walletEmailHash;
}

export function generateRandomString() {
  return Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

export function getUsernameFromEmail(string: string) {
  return string.replace(/[^a-zA-Z0-9]/g, '_');
}

export function encryptPassword(password: string) {
  const algorithm = process.env.ENCRYPTION_ALGO;
  const key = crypto.createHash('sha256').update(String(process.env.WALLET_KEY)).digest('base64').substr(0, 32);
  const randomHex = Buffer.from(process.env.RANDOM_HEX, 'base64');

  const cipher = crypto.createCipheriv(algorithm, key, randomHex);
  const encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
}

export function decryptPassword(password: string) {
  const algorithm = process.env.ENCRYPTION_ALGO;
  const key = crypto.createHash('sha256').update(String(process.env.WALLET_KEY)).digest('base64').substr(0, 32);
  const randomHex = Buffer.from(process.env.RANDOM_HEX, 'base64');

  const decipher = crypto.createDecipheriv(algorithm, key, randomHex);
  const decrypted = decipher.update(password, 'hex', 'utf8');
  return decrypted;
}


export function modifyEmail(type: number, email: string) {
  const splitEmail = email?.split("@")
  switch (type) {
    case 1:
      return email;
    case 2:
      return splitEmail[0] + '+client@' + splitEmail[1];
    case 3:
      return splitEmail[0] + '+partner@' + splitEmail[1];
    default:
      return email;
  }
}

export function isValidAmount(amount) {
  const formattedAmt = amount ? amount.replace(',', '') : '';
  return (!isNaN(formattedAmt) && (parseInt(formattedAmt, 10) > 0));
};

export function formatCurrency(amount) {
  return parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
};

export function isValidCurency(str) {
  return (typeof str === 'string' && str.length === 3)
};
