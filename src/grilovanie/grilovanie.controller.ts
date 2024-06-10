import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GrillovaneTransformedProductDto, GrilovanieResponseDto } from 'src/dto/grilovanie-response.dto';
import { GrilovanieService } from './grilovanie.service';

@ApiTags('Grilovanie')
@Controller('grilovanie')
export class GrilovanieController {
    constructor(private readonly grilovanieService: GrilovanieService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: GrilovanieResponseDto })
    async getProductsFromDb(): Promise<GrilovanieResponseDto> {
        return this.grilovanieService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: GrilovanieResponseDto })
    async updateAndGetProducts(): Promise<GrilovanieResponseDto> {
        return this.grilovanieService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [GrillovaneTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<GrillovaneTransformedProductDto[]> {
        return this.grilovanieService.getProductById(productId);
    }
}
