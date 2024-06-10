import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MasoRybyALahodkyService } from './maso-ryby-a-lahodky.service';
import { MasoRybyALahodkyResponseDto, MasoRybyALahodkyTransformedProductDto } from 'src/dto/MasoRybyALahodkyDTO';

@ApiTags('MasoRybyALahodky')
@Controller('masorybyalahodky')
export class MasoRybyALahodkyController {
    constructor(private readonly masorybyalahodkyService: MasoRybyALahodkyService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: MasoRybyALahodkyResponseDto })
    async getProductsFromDb(): Promise<MasoRybyALahodkyResponseDto> {
        return this.masorybyalahodkyService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: MasoRybyALahodkyResponseDto })
    async updateAndGetProducts(): Promise<MasoRybyALahodkyResponseDto> {
        return this.masorybyalahodkyService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [MasoRybyALahodkyTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<MasoRybyALahodkyTransformedProductDto[]> {
        return this.masorybyalahodkyService.getProductById(productId);
    }
}
