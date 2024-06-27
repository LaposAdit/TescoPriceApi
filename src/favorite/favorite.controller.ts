import { Controller, Post, Delete, Get, Param, Body, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ProductCategory } from '../enum/product-category.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateFavoriteDto } from 'src/dto/create-favorite.dto';

@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @ApiOperation({ summary: 'Add a favorite' })
    @ApiResponse({ status: 201, description: 'The favorite has been successfully added.' })
    @Post()
    async addFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
        const { userId, productId, category } = createFavoriteDto;
        return this.favoriteService.addFavorite(userId, productId, category);
    }

    @ApiOperation({ summary: 'Remove a favorite' })
    @ApiResponse({ status: 200, description: 'The favorite has been successfully removed.' })
    @Delete()
    async removeFavorite(
        @Query('userId') userId: string,
        @Query('productId') productId: string,
    ) {
        return this.favoriteService.removeFavorite(userId, productId);
    }

    @ApiOperation({ summary: 'Get all favorites for a user' })
    @ApiResponse({ status: 200, description: 'List of favorites for the user.' })
    @Get(':userId')
    async getFavorites(@Param('userId') userId: string) {
        return this.favoriteService.getFavorites(userId);
    }
}
