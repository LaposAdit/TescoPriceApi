import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MliecneVyrobkyAVajciaService } from './mliecne-vyrobky-a-vajcia.service';
import { MliecneVyrobkyAVajciaResponseDto, MliecneVyrobkyAVajciaTransformedProductDto } from 'src/dto/mliecne-vyrobky-a-vajciadto';

@ApiTags('Mliečne výrobky a vajcia')
@Controller('mliecne-vyrobky-a-vajcia')
export class MliecneVyrobkyAVajciaController {
    constructor(private readonly mliecneVyrobkyAVajciaService: MliecneVyrobkyAVajciaService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: MliecneVyrobkyAVajciaResponseDto })
    async getProductsFromDb(): Promise<MliecneVyrobkyAVajciaResponseDto> {
        return this.mliecneVyrobkyAVajciaService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: MliecneVyrobkyAVajciaResponseDto })
    async updateAndGetProducts(): Promise<MliecneVyrobkyAVajciaResponseDto> {
        return this.mliecneVyrobkyAVajciaService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [MliecneVyrobkyAVajciaTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<MliecneVyrobkyAVajciaTransformedProductDto[]> {
        return this.mliecneVyrobkyAVajciaService.getProductById(productId);
    }
}
