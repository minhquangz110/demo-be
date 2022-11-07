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
import { ProductsService } from './products.service';

import { Product } from './schemas/products.schema';
import { DataList } from 'src/types/dataList';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createCatDto: Product) {
    await this.productsService.createProduct(createCatDto);
  }

  @Get()
  async getProducts(
    @Query() paginationProp: PagiantionProp,
  ): Promise<DataList<Product[]>> {
    return this.productsService.getProducts(paginationProp);
  }
  @Put()
  async update(
    @Body('_id') _id: string,
    @Body()
    productUpdate: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(_id, productUpdate);
  }
  @Get('id')
  async findOne(@Query('id') id: string): Promise<DataApi<Product>> {
    return this.productsService.findOne(id);
  }

  @Delete()
  async delete(@Query('id') id: string) {
    return this.productsService.delete(id);
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
      paths.push(`${BASE_USL}/products/${file.filename}`);
    });
    return new DataApi(paths);
  }

  @Get(':imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<any> {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }
}
