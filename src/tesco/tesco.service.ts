import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TescoService {
    constructor(private readonly prisma: PrismaService) { }

    private getPrismaModel(category: string) {
        const modelMapping: Record<string, any> = {
            trvanlivePotraviny: this.prisma.trvanlivePotraviny,
            specialnaAZdravaVyziva: this.prisma.specialnaAZdravaVyziva,
            pecivo: this.prisma.pecivo,
            ovocieAZeleniny: this.prisma.ovocieAZeleniny,
            napoje: this.prisma.napoje,
            mrazenePotraviny: this.prisma.mrazenePotraviny,
            mliecneVyrobkyAVajcia: this.prisma.mliecneVyrobkyAVajcia,
            masoRybyALahodky: this.prisma.masoRybyALahodky,
            grilovanie: this.prisma.grilovanie,
            alkohol: this.prisma.alkohol,
        };

        const model = modelMapping[category];
        if (!model) {
            throw new NotFoundException(`Model for category ${category} not found`);
        }

        return model;
    }

    private createWhereClause(sale?: boolean) {
        const where: Record<string, any> = {};
        if (sale !== undefined) {
            where['hasPromotions'] = sale;
        }
        return where;
    }

    async getProducts(
        category: string,
        page: number,
        pageSize: number,
        sale?: boolean
    ): Promise<any> {
        const skip = (page - 1) * pageSize;
        const take = Number(pageSize); // Ensure take is an integer
        const model = this.getPrismaModel(category);
        const where = this.createWhereClause(sale);

        // Fetch distinct product IDs for counting
        const distinctProductIds = await model.findMany({
            where,
            select: { productId: true },
            distinct: ['productId']
        });
        const totalProducts = distinctProductIds.length;
        const totalPages = Math.ceil(totalProducts / pageSize);

        // Fetch the latest products based on the distinct product IDs
        const latestProducts = await model.findMany({
            where,
            skip,
            take,
            include: { promotions: true },
            orderBy: { lastUpdated: 'desc' },
            distinct: ['productId'], // Ensure only the latest product for each productId is returned
        });

        const transformedProducts = latestProducts.map((product: any) => ({
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
                promotionPrice: promo.promotionPrice, // Include promotionPrice here
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

    async getProductById(category: string, productId: string): Promise<any[]> {
        const model = this.getPrismaModel(category);
        const productsFromDb = await model.findMany({
            where: { productId },
            include: { promotions: true },
            orderBy: { lastUpdated: 'desc' }
        });

        return productsFromDb.map(product => ({
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
                promotionPrice: promo.promotionPrice, // Include promotionPrice here
            })),
            hasPromotions: product.promotions.length > 0,
            lastUpdated: product.lastUpdated,
        }));
    }

    private async searchModelForTerm(model: any, searchTerm: string, sale?: boolean) {
        const where: Record<string, any> = {
            title: {
                contains: searchTerm,
                mode: 'insensitive',
            },
        };
        if (sale !== undefined) {
            where['hasPromotions'] = sale;
        }

        return model.findMany({
            where,
            include: { promotions: true },
            orderBy: { lastUpdated: 'desc' }
        });
    }

    async searchProductsByName(searchTerm: string, page: number, pageSize: number, sale?: boolean, category?: string): Promise<any> {
        let models;

        if (category) {
            models = [this.getPrismaModel(category)];
        } else {
            models = [
                this.prisma.trvanlivePotraviny,
                this.prisma.specialnaAZdravaVyziva,
                this.prisma.pecivo,
                this.prisma.ovocieAZeleniny,
                this.prisma.napoje,
                this.prisma.mrazenePotraviny,
                this.prisma.mliecneVyrobkyAVajcia,
                this.prisma.masoRybyALahodky,
                this.prisma.grilovanie,
                this.prisma.alkohol,
            ];
        }

        const searchPromises = models.map(model => this.searchModelForTerm(model, searchTerm, sale));

        const searchResults = await Promise.all(searchPromises);
        const productsFromDb = searchResults.flat();

        const totalProducts = productsFromDb.length;
        const totalPages = Math.ceil(totalProducts / pageSize);
        const skip = (page - 1) * pageSize;

        const paginatedProducts = productsFromDb.slice(skip, skip + pageSize);

        const transformedProducts = paginatedProducts.map((product: any) => ({
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
                promotionPrice: promo.promotionPrice,
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
}
