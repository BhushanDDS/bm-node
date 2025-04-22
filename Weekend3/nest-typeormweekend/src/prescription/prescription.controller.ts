import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('prescription')
export class PrescriptionController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadPrescription(@UploadedFile() file: Express.Multer.File) {
      return {
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      };
    }

    
    
@Post('upload/multi')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]))
    uploadFile2(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
        return {
            filename: files.avatar[0].filename,
            path: `/uploads/${files.avatar[0].filename}`,

            filename2: files.background[0].filename,
            path2: `/uploads/${files.background[0].filename}`,
          };
    }
    



    @Post('upload/array')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile3(@UploadedFiles() files: Array<Express.Multer.File>) {

        return {


            filenames: files.map(file => file.filename),
            paths: files.map(file => `/uploads/${file.filename}`)
        }
    }
    

}

