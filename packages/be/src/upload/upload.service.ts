import { ApiException } from '@/common/api/error';
import { Injectable, Logger } from '@nestjs/common';
import { fromFile } from 'file-type';
import { join } from 'path';
import { rm, renameSync } from 'fs';
import { UPLOAD_FILE } from '@/utils/consts';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  async uploadIcon(icon: Express.Multer.File) {
    const acceptFiletype = ['png', 'jpg', 'gif'];
    const acceptFileLength = 1024 * 300; // 300k
    const absolutePath = join(process.cwd(), icon.path);
    if (icon.size > acceptFileLength) {
      this.delFile(absolutePath);
      throw new ApiException(`文件大小不能超过 1M！`);
    }
    const filetype = await fromFile(absolutePath);
    if (!filetype) {
      this.delFile(absolutePath);
      throw new ApiException(`无法识别文件类型！`);
    }
    if (!acceptFiletype.includes(filetype.ext)) {
      this.delFile(absolutePath);
      throw new ApiException(`只接受${acceptFiletype.join(', ')}类型！`);
    }
    return this.saveFile(icon);
  }

  private delFile(path: string) {
    rm(path, (err) => {
      if (err) this.logger.error('删除校验失败文件失败！' + err);
    });
  }

  private saveFile(icon: Express.Multer.File) {
    const fileName = join(process.cwd(), icon.path) + '-' + encodeURIComponent(icon.originalname);
    renameSync(join(process.cwd(), icon.path), fileName);
    return icon.path.replace(UPLOAD_FILE, '') + '-' + encodeURIComponent(icon.originalname);
  }
}
