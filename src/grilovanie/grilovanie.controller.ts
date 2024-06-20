import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { GrillovaneTransformedProductDto, GrilovanieResponseDto } from 'src/dto/grilovanie-response.dto';
import { GrilovanieService } from './grilovanie.service';

@ApiTags('Grilovanie')
@Controller('grilovanie')
export class GrilovanieController {
    constructor(private readonly grilovanieService: GrilovanieService) { }


    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number })
    @ApiQuery({ name: 'sale', required: false, description: 'Filter by sale', type: Boolean })
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: GrilovanieResponseDto })
    async getProductsFromDb(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25,
        @Query('sale') sale?: string // Change type to string to handle conversion
    ): Promise<GrilovanieResponseDto> {
        const saleBoolean = sale === 'true' ? true : sale === 'false' ? false : undefined;
        return this.grilovanieService.getProducts(false, Number(page), Number(pageSize), saleBoolean);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully updated from the API.' })
    async updateAndGetProducts(): Promise<{ message: string }> {
        await this.grilovanieService.updateProductsFromApi();
        return { message: 'The products have been successfully updated from the API.' };
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [GrillovaneTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<GrillovaneTransformedProductDto[]> {
        return this.grilovanieService.getProductById(productId);
    }
}
