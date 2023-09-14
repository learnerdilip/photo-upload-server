import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import "dotenv/config"


export default class s3Service {
  private client = new S3Client({
    region: process.env.YOUR_REGION, 
    credentials: 
      { 
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      }
    })
  private BUCKET_NAME = "picture-upload-lytho-dilip"
  
  async uploadFile(file: any): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype
    });
  
    const response = await this.client.send(command);

    if(response.$metadata.httpStatusCode == 200) {
      const publicUri = `https://${this.BUCKET_NAME}.s3.amazonaws.com/${file.originalname}`
      return publicUri
    }

    return ""
  };
}

