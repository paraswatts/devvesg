import S3 from 'aws-sdk/clients/s3';
import { Readable } from 'stream';
import path from 'path';

const bucketName = process.env.S3_BUCKET_NAME;

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

export async function uploadFile(file: Express.Multer.File, entityType: string, fieldName: string, mediaUuid: string) {
  const fileStream = Readable.from(file.buffer);
  const extension = path.extname(file.originalname);
  const uploadParams: S3.PutObjectRequest = {
    Bucket: bucketName,
    Body: fileStream,
    Key: `${entityType}/${mediaUuid}-${fieldName}${extension}`,
  };
  return s3.upload(uploadParams).promise();
}

export function getSignedUrl(url: string, entityType: string, fieldName: string, mediaUuid: string) {
  if (!url || url.length === 0 || !url.includes(bucketName) || url.includes('AccessKeyId')) {
    // If the url is empty, not stored in s3, or is already signed pass it back
    return url;
  }

  const extension = path.extname(url);
  const params = {
    Bucket: bucketName,
    Key: `${entityType}/${mediaUuid}-${fieldName}${extension}`,
    Expires: 60,
  };
  return s3.getSignedUrl('getObject', params);
}

export async function deleteFile(url: string, entityType: string, fieldName: string, mediaUuid: string) {
  const cleanUrl = url.replace(/(\?.+)/, '');
  const extension = path.extname(cleanUrl);
  const deleteParams: S3.DeleteObjectRequest = {
    Bucket: bucketName,
    Key: `${entityType}/${mediaUuid}-${fieldName}${extension}`,
  };

  return s3.deleteObject(deleteParams).promise();
}
