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
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: AlkoholResponseDto })
    async getProductsFromDb(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25
    ): Promise<AlkoholResponseDto> {
        return this.alkoholService.getProducts(false, Number(page), Number(pageSize));
    }

    @Get('update')
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number })
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: AlkoholResponseDto })
    async updateAndGetProducts(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25
    ): Promise<AlkoholResponseDto> {
        return this.alkoholService.getProducts(true, Number(page), Number(pageSize));
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [AlkoholTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<AlkoholTransformedProductDto[]> {
        return this.alkoholService.getProductById(productId);
    }
}
