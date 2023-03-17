import {
    Controller,
    Post,
    Body,
    HttpStatus,
    Inject,
    Get,
    Param,
    Put,
    Request,
    UseGuards,
    Delete,
    Req,
    Query,
} from '@nestjs/common';
import { BaseService } from '../base';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto'
import { JwtAuthGuard } from '../auth';

@Controller('products')
export class ProductController {
    @Inject(ProductService)
    private readonly productService: ProductService;
    @Inject(BaseService)
    private readonly baseService: BaseService;

    @Get('')
    public async findAll(
        @Request() req,
        @Query() data?: any
    ) {
        const products = await this.productService.findAll(data);
        return this.baseService.transformResponse(
            'Products fetched successfully',
            products,
            HttpStatus.OK,
        );
    }

    @Post('')
    @UseGuards(JwtAuthGuard)
    public async create(@Body() data: CreateProductDto, @Req() req) {
        const user = req.user.role;
        const newProduct = await this.productService.create(data, user);

        return this.baseService.transformResponse(
            'Product created successfully',
            newProduct,
            HttpStatus.CREATED,
        );
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public async getProductById(@Param('id') id: string) {
        const product = await this.productService.findById(id);
        return this.baseService.transformResponse(
            'Product retrieved successfully',
            product,
            HttpStatus.OK,
        );
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    public async update(
        @Param('id') id: string,
        @Body() data: UpdateProductDto,
        @Req() req
    ) {
        const user = req.user.aud;
        const updatedProduct = await this.productService.update(id, data, user);
        return this.baseService.transformResponse(
            'Product updated successfully',
            updatedProduct,
            HttpStatus.OK,
        );
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    public async delete(@Param('id') id: string, @Req() req) {
        const user = req.user.aud;
        const deletedProduct = await this.productService.delete(id, user);
        return this.baseService.transformResponse(
            'Product deleted successfully',
            deletedProduct,
            HttpStatus.OK,
        );
    }

    @Post('/buy-product')
    @UseGuards(JwtAuthGuard)
    public async buyProduct(@Body() data: any, @Req() req) {
        const user = req.user.aud;
        const boughtProduct = await this.productService.buyProduct(data, user);
        return this.baseService.transformResponse(
            'Product bought successfully',
            boughtProduct,
            HttpStatus.OK,
        );
    }
}
