import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MrazenePotravinyService } from './mrazene-potraviny.service';
import { MrazenePotravinyResponseDto, MrazenePotravinyTransformedProductDto } from '../dto/MrazenePotravinyDTO';

@ApiTags('Mrazene potraviny')
@Controller('mrazene-potraviny')
export class MrazenePotravinyController {

    constructor(private readonly mrazenePotravinyService: MrazenePotravinyService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: MrazenePotravinyResponseDto })
    async getProductsFromDb(): Promise<MrazenePotravinyResponseDto> {
        return this.mrazenePotravinyService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: MrazenePotravinyResponseDto })
    async updateAndGetProducts(): Promise<MrazenePotravinyResponseDto> {
        return this.mrazenePotravinyService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [MrazenePotravinyTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<MrazenePotravinyTransformedProductDto[]> {
        return this.mrazenePotravinyService.getProductById(productId);
    }
}
