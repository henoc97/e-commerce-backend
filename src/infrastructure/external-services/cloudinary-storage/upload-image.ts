import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

@Injectable()
export class UploadImageService {
  constructor(@Inject('CLOUDINARY') private cloudinary) { }

  // Upload image with transformations and custom options
  async uploadImage(
    filePath: string,
    options: any = {}, // additional upload options (e.g., folder, quality, etc.)
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      const defaultOptions = {
        folder: 'my_ecommerce_images', // You can customize the folder path
        transformation: [
          { width: 800, height: 600, crop: 'limit' }, // Example: resize with max width/height
          { quality: 'auto' }, // Automatically adjust quality for performance
          { fetch_format: 'auto' }, // Automatically choose the best format (e.g., WebP)
        ],
        invalidate: true, // Invalidate cached versions of the image
        ...options, // Merge additional options provided
      };

      const result = await this.cloudinary.uploader.upload(
        filePath,
        defaultOptions,
      );
      return result;
    } catch (error) {
      if (error instanceof Error && 'http_code' in error) {
        throw new BadRequestException(`Erreur Cloudinary : ${error.message}`);
      }
      throw new Error(
        `Échec du téléchargement de l'image : ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // Retrieve an image URL based on publicId and optional transformations
  getImageUrl(publicId: string, options: any = {}): string {
    // Default transformations if any
    const defaultOptions = {
      width: 800, // Example: set width
      height: 600, // Example: set height
      crop: 'limit', // Example: limit image size
      fetch_format: 'auto', // Automatically choose the best format (WebP, etc.)
    };

    const transformationOptions = { ...defaultOptions, ...options };

    // Generate and return the Cloudinary image URL
    const imageUrl = cloudinary.url(publicId, transformationOptions);

    return imageUrl;
  }

  // Method for deleting images
  async deleteImage(publicId: string): Promise<any> {
    try {
      const result = await this.cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Failed to delete image: ${error}`);
    }
  }
}
