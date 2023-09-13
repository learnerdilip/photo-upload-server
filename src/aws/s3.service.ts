import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";


export default class s3Service {
  private client = new S3Client({region: ""})
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

