import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NapojeService } from './napoje.service';
import { NapojeResponseDto, NapojeTransformedProductDto } from 'src/dto/NapojeDTO';

@ApiTags('Napoje')
@Controller('napoje')
export class NapojeController {

    constructor(private readonly napojeService: NapojeService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: NapojeResponseDto })
    async getProductsFromDb(): Promise<NapojeResponseDto> {
        return this.napojeService.getProducts(false);
    }

    @Get('update')
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the API, updated in the database, and returned.', type: NapojeResponseDto })
    async updateAndGetProducts(): Promise<NapojeResponseDto> {
        return this.napojeService.getProducts(true);
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: [NapojeTransformedProductDto] })
    async getProductById(@Param('productId') productId: string): Promise<NapojeTransformedProductDto[]> {
        return this.napojeService.getProductById(productId);
    }
}
