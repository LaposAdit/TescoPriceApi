import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { SpecialnaAZdravaVyzivaService } from './specialna-a-zdrava-vyziva.service';
import { SpecialnaAZdravaVyzivaResponseDto, SpecialnaAZdravaVyzivaTransformedProductDto } from 'src/dto/SpecialnaAZdravaVyzivaDTO';


@ApiTags('Specialna A Zdrava Vyziva')
@Controller('specialna-a-zdrava-vyziva')
export class SpecialnaAZdravaVyzivaController {
    constructor(private readonly specialnaAZdravaVyzivaService: SpecialnaAZdravaVyzivaService) { }




    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number })
    @ApiQuery({ name: 'sale', required: false, description: 'Filter by sale', type: Boolean })
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: SpecialnaAZdravaVyzivaResponseDto })
    async getProductsFromDb(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25,
        @Query('sale') sale?: string // Change type to string to handle conversion
    ): Promise<SpecialnaAZdravaVyzivaResponseDto> {
        const saleBoolean = sale === 'true' ? true : sale === 'false' ? false : undefined;
        return this.specialnaAZdravaVyzivaService.getProducts(false, Number(page), Number(pageSize), saleBoolean);
    }



    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully updated from the API.' })
    async updateAndGetProducts(): Promise<{ message: string }> {
        await this.specialnaAZdravaVyzivaService.updateProductsFromApi();
        return { message: 'The products have been successfully updated from the API.' };
    }



    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [SpecialnaAZdravaVyzivaTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<SpecialnaAZdravaVyzivaTransformedProductDto[]> {
        return this.specialnaAZdravaVyzivaService.getProductById(productId);
    }
}
