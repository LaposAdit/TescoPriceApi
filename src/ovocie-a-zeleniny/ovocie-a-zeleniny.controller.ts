import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { OvocieAZeleninyResponseDto } from 'src/dto/ovocie-a-zeleniny-response.dto';
import { OvocieAZeleninyService } from './ovocie-a-zeleniny.service';
import { OvocieAZeleninyTransformedProductDto } from 'src/dto/ovocie-a-zeleniny-response.dto';

@ApiTags('Ovocie a Zeleniny')
@Controller('ovocie-a-zeleniny')
export class OvocieAZeleninyController {
    constructor(private readonly ovocieAZeleninyService: OvocieAZeleninyService) { }



    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number })
    @ApiQuery({ name: 'sale', required: false, description: 'Filter by sale', type: Boolean })
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: OvocieAZeleninyResponseDto })
    async getProductsFromDb(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25,
        @Query('sale') sale?: string // Change type to string to handle conversion
    ): Promise<OvocieAZeleninyResponseDto> {
        const saleBoolean = sale === 'true' ? true : sale === 'false' ? false : undefined;
        return this.ovocieAZeleninyService.getProducts(false, Number(page), Number(pageSize), saleBoolean);
    }



    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully updated from the API.' })
    async updateAndGetProducts(): Promise<{ message: string }> {
        await this.ovocieAZeleninyService.updateProductsFromApi();
        return { message: 'The products have been successfully updated from the API.' };
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [OvocieAZeleninyTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<OvocieAZeleninyTransformedProductDto[]> {
        return this.ovocieAZeleninyService.getProductById(productId);
    }
}
