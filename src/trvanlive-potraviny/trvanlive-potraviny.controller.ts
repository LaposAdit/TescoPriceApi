import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrvanlivePotravinyService } from './trvanlive-potraviny.service';
import { TrvanlivePotravinyResponseDto, TrvanlivePotravinyTransformedProductDto } from 'src/dto/trvanlive-potravinyDTO';

@ApiTags('Trvanlive potraviny')
@Controller('trvanlive-potraviny')
export class TrvanlivePotravinyController {
    constructor(private readonly trvanlivePotravinyService: TrvanlivePotravinyService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: TrvanlivePotravinyResponseDto })
    async getProductsFromDb(): Promise<TrvanlivePotravinyResponseDto> {
        return this.trvanlivePotravinyService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: TrvanlivePotravinyResponseDto })
    async updateAndGetProducts(): Promise<TrvanlivePotravinyResponseDto> {
        return this.trvanlivePotravinyService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [TrvanlivePotravinyTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<TrvanlivePotravinyTransformedProductDto[]> {
        return this.trvanlivePotravinyService.getProductById(productId);
    }
}
