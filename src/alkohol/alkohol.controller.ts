import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlkoholService } from './alkohol.service';
import { AlkoholResponseDto, AlkoholTransformedProductDto } from 'src/dto/AlkoholDTO';




@ApiTags('Alkohol')
@Controller('alkohol')
export class AlkoholController {

    constructor(private readonly alkoholService: AlkoholService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: AlkoholResponseDto })
    async getProductsFromDb(): Promise<AlkoholResponseDto> {
        return this.alkoholService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: AlkoholResponseDto })
    async updateAndGetProducts(): Promise<AlkoholResponseDto> {
        return this.alkoholService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [AlkoholTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<AlkoholTransformedProductDto[]> {
        return this.alkoholService.getProductById(productId);
    }
}
