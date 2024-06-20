import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { NapojeService } from './napoje.service';
import { NapojeResponseDto, NapojeTransformedProductDto } from 'src/dto/NapojeDTO';

@ApiTags('Napoje')
@Controller('napoje')
export class NapojeController {

    constructor(private readonly napojeService: NapojeService) { }


    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number })
    @ApiQuery({ name: 'sale', required: false, description: 'Filter by sale', type: Boolean })
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: NapojeResponseDto })
    async getProductsFromDb(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25,
        @Query('sale') sale?: string // Change type to string to handle conversion
    ): Promise<NapojeResponseDto> {
        const saleBoolean = sale === 'true' ? true : sale === 'false' ? false : undefined;
        return this.napojeService.getProducts(false, Number(page), Number(pageSize), saleBoolean);
    }


    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully updated from the API.' })
    async updateAndGetProducts(): Promise<{ message: string }> {
        await this.napojeService.updateProductsFromApi();
        return { message: 'The products have been successfully updated from the API.' };
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [NapojeTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<NapojeTransformedProductDto[]> {
        return this.napojeService.getProductById(productId);
    }
}
