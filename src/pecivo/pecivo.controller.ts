import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PecivoService } from './pecivo.service';
import { PecivoResponseDto, PecivoTransformedProductDto } from 'src/dto/pecivodto';

@ApiTags('Pečivo')
@Controller('pecivo')
export class PecivoController {
    constructor(private readonly pecivoService: PecivoService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: PecivoResponseDto })
    async getProductsFromDb(): Promise<PecivoResponseDto> {
        return this.pecivoService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: PecivoResponseDto })
    async updateAndGetProducts(): Promise<PecivoResponseDto> {
        return this.pecivoService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [PecivoTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<PecivoTransformedProductDto[]> {
        return this.pecivoService.getProductById(productId);
    }
}
