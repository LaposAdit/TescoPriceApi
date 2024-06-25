import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductCategory } from '../enum/product-category.enum';

@Injectable()
export class TescoService {
    constructor(private readonly prisma: PrismaService) { }

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

    private createWhereClause(sale?: boolean) {
        const where: Record<string, any> = {};
        if (sale !== undefined) {
            where['hasPromotions'] = sale;
        }
        return where;
    }

    async getProducts(
        category: ProductCategory,
        page: number,
        pageSize: number,
        sale?: boolean
    ): Promise<any> {
        const skip = (page - 1) * pageSize;
        const take = Number(pageSize); // Ensure take is an integer
        const model = this.getPrismaModel(category);
        const where = this.createWhereClause(sale);

        const [productsFromDb, totalProducts] = await this.prisma.$transaction([
            model.findMany({
                where,
                skip,
                take,
                include: { promotions: true },
                orderBy: { lastUpdated: 'desc' },
            }),
            model.count({ where }),
        ]);

        const totalPages = Math.ceil(totalProducts / pageSize);

        const transformedProducts = productsFromDb.map((product: any) => ({
            productId: product.productId,
            title: product.title,
            price: product.price,
            unitPrice: product.unitPrice,
            imageUrl: product.imageUrl,
            unitOfMeasure: product.unitOfMeasure,
            isForSale: product.isForSale,
            aisleName: product.aisleName,
            superDepartmentName: product.superDepartmentName,
            promotions: product.promotions.map((promo: any) => ({
                promotionId: promo.promotionId,
                promotionType: promo.promotionType,
                startDate: promo.startDate.toISOString(),
                endDate: promo.endDate.toISOString(),
                offerText: promo.offerText,
                attributes: promo.attributes,
            })),
            hasPromotions: product.promotions.length > 0,
            lastUpdated: product.lastUpdated,
        }));

        return {
            totalPages,
            totalProducts,
            products: transformedProducts,
        };
    }

    async getProductById(category: ProductCategory, productId: string): Promise<any[]> {
        const model = this.getPrismaModel(category);
        return model.findMany({ where: { productId } });
    }
}
