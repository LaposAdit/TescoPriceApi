import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '../enum/product-category.enum';

export class CreateFavoriteDto {
    @ApiProperty({ example: 'user123', description: 'The ID of the user' })
    userId: string;

    @ApiProperty({ example: '2005105002867', description: 'The ID of the product' })
    productId: string;

    @ApiProperty({ enum: ProductCategory, example: ProductCategory.Grilovanie, description: 'The category of the product' })
    category: ProductCategory;
}
