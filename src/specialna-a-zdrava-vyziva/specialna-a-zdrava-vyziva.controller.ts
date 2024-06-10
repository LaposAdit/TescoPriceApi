import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecialnaAZdravaVyzivaService } from './specialna-a-zdrava-vyziva.service';
import { SpecialnaAZdravaVyzivaResponseDto, SpecialnaAZdravaVyzivaTransformedProductDto } from 'src/dto/SpecialnaAZdravaVyzivaDTO';


@ApiTags('Specialna A Zdrava Vyziva')
@Controller('specialna-a-zdrava-vyziva')
export class SpecialnaAZdravaVyzivaController {
    constructor(private readonly specialnaAZdravaVyzivaService: SpecialnaAZdravaVyzivaService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: SpecialnaAZdravaVyzivaResponseDto })
    async getProductsFromDb(): Promise<SpecialnaAZdravaVyzivaResponseDto> {
        return this.specialnaAZdravaVyzivaService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: SpecialnaAZdravaVyzivaResponseDto })
    async updateAndGetProducts(): Promise<SpecialnaAZdravaVyzivaResponseDto> {
        return this.specialnaAZdravaVyzivaService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [SpecialnaAZdravaVyzivaTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<SpecialnaAZdravaVyzivaTransformedProductDto[]> {
        return this.specialnaAZdravaVyzivaService.getProductById(productId);
    }
}
