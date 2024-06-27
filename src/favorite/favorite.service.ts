import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductCategory } from '../enum/product-category.enum';

@Injectable()
export class FavoriteService {
    constructor(private readonly prisma: PrismaService) { }

    async addFavorite(userId: string, productId: string, category: ProductCategory) {
        return this.prisma.favorite.create({
            data: {
                userId,
                productId,
                category: category as string,
            },
        });
    }

    async removeFavorite(userId: string, productId: string) {
        return this.prisma.favorite.deleteMany({
            where: {
                userId,
                productId,
            },
        });
    }

    private getPrismaModel(category: ProductCategory) {
        const modelMapping: Record<ProductCategory, any> = {
            [ProductCategory.TrvanlivePotraviny]: this.prisma.trvanlivePotraviny,
            [ProductCategory.SpecialnaAZdravaVyziva]: this.prisma.specialnaAZdravaVyziva,
            [ProductCategory.Pecivo]: this.prisma.pecivo,
            [ProductCategory.OvocieAZeleniny]: this.prisma.ovocieAZeleniny,
            [ProductCategory.Napoje]: this.prisma.napoje,
            [ProductCategory.MrazenePotraviny]: this.prisma.mrazenePotraviny,
            [ProductCategory.MliecneVyrobkyAVajcia]: this.prisma.mliecneVyrobkyAVajcia,
            [ProductCategory.MasoRybyALahodky]: this.prisma.masoRybyALahodky,
            [ProductCategory.Grilovanie]: this.prisma.grilovanie,
            [ProductCategory.Alkohol]: this.prisma.alkohol,
        };

        return modelMapping[category];
    }

    async getFavorites(userId: string) {
        const favorites = await this.prisma.favorite.findMany({
            where: { userId },
        });

        const favoriteProducts = await Promise.all(
            favorites.map(async (favorite) => {
                const model = this.getPrismaModel(favorite.category as ProductCategory);
                const product = await model.findUnique({
                    where: { productId: favorite.productId },
                    include: { promotions: true }
                });
                return {
                    ...favorite,
                    product: {
                        productId: product.productId,
                        title: product.title,
                        price: product.price,
                        unitPrice: product.unitPrice,
                        imageUrl: product.imageUrl,
                        unitOfMeasure: product.unitOfMeasure,
                        isForSale: product.isForSale,
                        aisleName: product.aisleName,
                        superDepartmentName: product.superDepartmentName,
                        promotions: product.promotions.map(promo => ({
                            promotionId: promo.promotionId,
                            promotionType: promo.promotionType,
                            startDate: promo.startDate.toISOString(),
                            endDate: promo.endDate.toISOString(),
                            offerText: promo.offerText,
                            attributes: promo.attributes,
                            promotionPrice: promo.promotionPrice,
                        })),
                        hasPromotions: product.promotions.length > 0,
                        lastUpdated: product.lastUpdated,
                    },
                };
            })
        );

        return favoriteProducts;
    }
}
