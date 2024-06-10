import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OvocieAZeleninyResponseDto } from 'src/dto/ovocie-a-zeleniny-response.dto';
import { OvocieAZeleninyService } from './ovocie-a-zeleniny.service';
import { OvocieAZeleninyTransformedProductDto } from 'src/dto/ovocie-a-zeleniny-response.dto';

@ApiTags('Ovocie a Zeleniny')
@Controller('ovocie-a-zeleniny')
export class OvocieAZeleninyController {
    constructor(private readonly ovocieAZeleninyService: OvocieAZeleninyService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: OvocieAZeleninyResponseDto })
    async getProductsFromDb(): Promise<OvocieAZeleninyResponseDto> {
        return this.ovocieAZeleninyService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: OvocieAZeleninyResponseDto })
    async updateAndGetProducts(): Promise<OvocieAZeleninyResponseDto> {
        return this.ovocieAZeleninyService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [OvocieAZeleninyTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<OvocieAZeleninyTransformedProductDto[]> {
        return this.ovocieAZeleninyService.getProductById(productId);
    }
}
