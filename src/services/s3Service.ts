
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // Replace with your AWS region
  // We'll use credentials from environment variables or AWS SDK defaults
  // AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY should be set in the environment
});

const s3 = new AWS.S3();
const BUCKET_NAME = 'akhilsbucket523261';

export const uploadToS3 = async (key: string, data: any): Promise<string> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
  };

  try {
    const result = await s3.upload(params).promise();
    console.log('Successfully uploaded to S3:', result.Location);
    return result.Location;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

export const downloadFromS3 = async (key: string): Promise<any> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    if (data.Body) {
      return JSON.parse(data.Body.toString('utf-8'));
    }
    return null;
  } catch (error) {
    if ((error as AWS.AWSError).code === 'NoSuchKey') {
      console.log(`No data found for key: ${key}`);
      return null;
    }
    console.error('Error downloading from S3:', error);
    throw error;
  }
};

export const deleteFromS3 = async (key: string): Promise<void> => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log(`Successfully deleted ${key} from S3`);
  } catch (error) {
    console.error('Error deleting from S3:', error);
    throw error;
  }
};
