import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UPLOAD_FILE } from '@/utils/consts';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('icon')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { icon: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(
    FileInterceptor('icon', {
      dest: UPLOAD_FILE + '/icons',
    }),
  )
  async uploadIcon(@UploadedFile() icon: Express.Multer.File) {
    return this.uploadService.uploadIcon(icon);
  }
}
