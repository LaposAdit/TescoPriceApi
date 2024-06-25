import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ProductCategory } from 'src/enum/product-category.enum';
import { TescoService } from './tesco.service';
import { GenericResponse } from 'src/dto/Tesco-ResponsDTO';

@ApiTags('Products')
@Controller('products')
export class TescoController {
    constructor(private readonly service: TescoService) { }

    @Get()
    @ApiQuery({ name: 'category', required: false, enum: ProductCategory, description: 'Product category' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number })
    @ApiQuery({ name: 'sale', required: false, description: 'Filter by sale', type: Boolean })
    @ApiResponse({ status: 200, description: 'The products have been successfully fetched from the database.', type: Object })
    async getProductsFromDb(
        @Query('category') category?: ProductCategory,
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 25,
        @Query('sale') sale?: string
    ): Promise<GenericResponse<any>> {
        const saleBoolean = sale === 'true' ? true : sale === 'false' ? false : undefined;

        if (category) {
            return this.service.getProducts(category, page, pageSize, saleBoolean);
        } else {
            // Logic to fetch from all models if no category is specified
            const allResults: any[] = [];
            let total = 0;

            const categories = Object.values(ProductCategory);
            for (const cat of categories) {
                const result = await this.service.getProducts(cat, page, pageSize, saleBoolean);
                allResults.push(...result.items);
                total += result.total;
            }

            return { items: allResults, total };
        }
    }

    @Get(':productId')
    @ApiResponse({ status: 200, description: 'The product history has been successfully fetched from the database.', type: Object })
    async getProductById(@Param('productId') productId: string, @Query('category') category: ProductCategory): Promise<any[]> {
        return this.service.getProductById(category, productId);
    }
}