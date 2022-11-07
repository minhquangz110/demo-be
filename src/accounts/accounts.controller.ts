import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFiles } from '@nestjs/common/decorators';

import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Observable, of } from 'rxjs';
import { BASE_USL } from 'src/constants';
import { DataApi } from 'src/types/dataApi';
import { PagiantionProp } from 'src/request/paginationProp';
import { AccountsService } from './accounts.service';

import { Account } from './schemas/accounts.schema';
import { DataList } from 'src/types/dataList';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createCatDto: Account) {
    return await this.accountsService.createAccount(createCatDto);
  }

  @Get()
  async getAccounts(
    @Query() paginationProp: PagiantionProp,
  ): Promise<DataList<Account[]>> {
    return this.accountsService.getAccounts(paginationProp);
  }
  @Put()
  async update(
    @Body('_id') _id: string,
    @Body()
    accountUpdate: Partial<Account>,
  ) {
    return this.accountsService.update(_id, accountUpdate);
  }

  @Delete()
  async delete(@Query('id') id: string) {
    return this.accountsService.delete(id);
  }
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(@UploadedFiles() files: Express.Multer.File[]) {
    const paths = [];

    files.forEach((file) => {
      paths.push(`${BASE_USL}/accounts/${file.filename}`);
    });
    return new DataApi(paths);
  }

  @Get(':imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<any> {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }
}
