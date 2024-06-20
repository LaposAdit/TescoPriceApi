import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { MliecneVyrobkyAVajciaService } from './mliecne-vyrobky-a-vajcia.service';
import { MliecneVyrobkyAVajciaResponseDto, MliecneVyrobkyAVajciaTransformedProductDto } from 'src/dto/mliecne-vyrobky-a-vajciadto';

@ApiTags('Mliečne výrobky a vajcia')
@Controller('mliecne-vyrobky-a-vajcia')
export class MliecneVyrobkyAVajciaController {
    constructor(private readonly mliecneVyrobkyAVajciaService: MliecneVyrobkyAVajciaService) { }


    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number })
    @ApiQuery({ name: 'sale', required: false, description: 'Filter by sale', type: Boolean })
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: MliecneVyrobkyAVajciaResponseDto })
    async getProductsFromDb(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25,
        @Query('sale') sale?: string // Change type to string to handle conversion
    ): Promise<MliecneVyrobkyAVajciaResponseDto> {
        const saleBoolean = sale === 'true' ? true : sale === 'false' ? false : undefined;
        return this.mliecneVyrobkyAVajciaService.getProducts(false, Number(page), Number(pageSize), saleBoolean);
    }


    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully updated from the API.' })
    async updateAndGetProducts(): Promise<{ message: string }> {
        await this.mliecneVyrobkyAVajciaService.updateProductsFromApi();
        return { message: 'The products have been successfully updated from the API.' };
    }


    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [MliecneVyrobkyAVajciaTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<MliecneVyrobkyAVajciaTransformedProductDto[]> {
        return this.mliecneVyrobkyAVajciaService.getProductById(productId);
    }
}
