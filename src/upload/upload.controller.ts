import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file',multerConfig))
  uploadFile(@UploadedFile() file: any) { // No explicit type required
    console.log(file); // File object contains file information
    return {
      message: 'File uploaded successfully',
    //   fileName: file.originalname,
    //   path: file.path,
    };
  }
}

