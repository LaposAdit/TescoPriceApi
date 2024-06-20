import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AlkoholService } from './alkohol.service';
import { AlkoholResponseDto, AlkoholTransformedProductDto } from 'src/dto/AlkoholDTO';

@ApiTags('Alkohol')
@Controller('alkohol')
export class AlkoholController {
    constructor(private readonly alkoholService: AlkoholService) { }

    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number })
    @ApiQuery({ name: 'sale', required: false, description: 'Filter by sale', type: Boolean })
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: AlkoholResponseDto })
    async getProductsFromDb(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25,
        @Query('sale') sale?: string // Change type to string to handle conversion
    ): Promise<AlkoholResponseDto> {
        const saleBoolean = sale === 'true' ? true : sale === 'false' ? false : undefined;
        return this.alkoholService.getProducts(false, Number(page), Number(pageSize), saleBoolean);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully updated from the API.' })
    async updateAndGetProducts(): Promise<{ message: string }> {
        await this.alkoholService.updateProductsFromApi();
        return { message: 'The products have been successfully updated from the API.' };
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [AlkoholTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<AlkoholTransformedProductDto[]> {
        return this.alkoholService.getProductById(productId);
    }
}
