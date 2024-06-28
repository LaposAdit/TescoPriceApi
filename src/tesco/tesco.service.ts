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
        const allCategories = [
            'trvanlivePotraviny',
            'specialnaAZdravaVyziva',
            'pecivo',
            'ovocieAZeleniny',
            'napoje',
            'mrazenePotraviny',
            'mliecneVyrobkyAVajcia',
            'masoRybyALahodky',
            'grilovanie',
            'alkohol',
        ];

        const availableCategories: Set<string> = new Set(allCategories);

        if (category === 'all') {
            // Fetch from all categories without pagination first
            const models: Array<{ model: keyof PrismaService, category: string }> = [
                { model: 'trvanlivePotraviny', category: 'trvanlivePotraviny' },
                { model: 'specialnaAZdravaVyziva', category: 'specialnaAZdravaVyziva' },
                { model: 'pecivo', category: 'pecivo' },
                { model: 'ovocieAZeleniny', category: 'ovocieAZeleniny' },
                { model: 'napoje', category: 'napoje' },
                { model: 'mrazenePotraviny', category: 'mrazenePotraviny' },
                { model: 'mliecneVyrobkyAVajcia', category: 'mliecneVyrobkyAVajcia' },
                { model: 'masoRybyALahodky', category: 'masoRybyALahodky' },
                { model: 'grilovanie', category: 'grilovanie' },
                { model: 'alkohol', category: 'alkohol' },
            ];

            const allResults: any[] = [];
            let totalProducts = 0;

            for (const { model, category } of models) {
                const where = this.createWhereClause(sale);
                const modelInstance = this.prisma[model] as any;

                // Fetch distinct product IDs for counting
                const distinctProductIds = await modelInstance.findMany({
                    where,
                    select: { productId: true },
                    distinct: ['productId']
                });
                totalProducts += distinctProductIds.length;

                // Fetch the latest products based on the distinct product IDs
                const latestProducts = await modelInstance.findMany({
                    where,
                    include: { promotions: true },
                    orderBy: { lastUpdated: 'desc' },
                    distinct: ['productId'], // Ensure only the latest product for each productId is returned
                });

                // Add category to each product
                const transformedProducts = latestProducts.map((product: any) => ({
                    ...product,
                    category
                }));

                allResults.push(...transformedProducts);
            }

            const totalPages = Math.ceil(totalProducts / pageSize);
            const paginatedProducts = allResults.slice(skip, skip + take); // Paginate the combined results

            const transformedProducts = paginatedProducts.map((product: any) => ({
                dbId: product.id, // Add dbId here
                productId: product.productId,
                title: product.title,
                price: product.price,
                unitPrice: product.unitPrice,
                imageUrl: product.imageUrl,
                unitOfMeasure: product.unitOfMeasure,
                isForSale: product.isForSale,
                aisleName: product.aisleName,
                superDepartmentName: product.superDepartmentName,
                category: product.category,
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
                availableCategories: Array.from(availableCategories),
            };
        } else {
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
                dbId: product.id, // Add dbId here
                productId: product.productId,
                title: product.title,
                price: product.price,
                unitPrice: product.unitPrice,
                imageUrl: product.imageUrl,
                unitOfMeasure: product.unitOfMeasure,
                isForSale: product.isForSale,
                aisleName: product.aisleName,
                superDepartmentName: product.superDepartmentName,
                category,
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
                availableCategories: Array.from(availableCategories),
            };
        }
    }

    async getProductById(category: string, productId: string): Promise<any[]> {
        const model = this.getPrismaModel(category);
        const productsFromDb = await model.findMany({
            where: { productId },
            include: { promotions: true },
            orderBy: { lastUpdated: 'desc' }
        });

        return productsFromDb.map(product => ({
            dbId: product.id, // Add dbId here
            productId: product.productId,
            title: product.title,
            price: product.price,
            unitPrice: product.unitPrice,
            imageUrl: product.imageUrl,
            unitOfMeasure: product.unitOfMeasure,
            isForSale: product.isForSale,
            aisleName: product.aisleName,
            superDepartmentName: product.superDepartmentName,
            category,
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

    private async searchModelForTerm(model: any, searchTerm: string, sale?: boolean, category?: string) {
        const where: Record<string, any> = {
            title: {
                contains: searchTerm,
                mode: 'insensitive',
            },
        };
        if (sale !== undefined) {
            where['hasPromotions'] = sale;
        }

        const results = await model.findMany({
            where,
            include: { promotions: true },
            orderBy: { lastUpdated: 'desc' }
        });

        return results.map((product: any) => ({
            ...product,
            category
        }));
    }

    async searchProductsByName(searchTerm: string, page: number, pageSize: number, sale?: boolean, category?: string): Promise<any> {
        const allCategories = [
            'trvanlivePotraviny',
            'specialnaAZdravaVyziva',
            'pecivo',
            'ovocieAZeleniny',
            'napoje',
            'mrazenePotraviny',
            'mliecneVyrobkyAVajcia',
            'masoRybyALahodky',
            'grilovanie',
            'alkohol',
        ];
        const availableCategories: Set<string> = new Set(allCategories);

        let models;

        if (category) {
            models = [{ model: this.getPrismaModel(category), category }];
        } else {
            models = [
                { model: this.prisma.trvanlivePotraviny, category: 'trvanlivePotraviny' },
                { model: this.prisma.specialnaAZdravaVyziva, category: 'specialnaAZdravaVyziva' },
                { model: this.prisma.pecivo, category: 'pecivo' },
                { model: this.prisma.ovocieAZeleniny, category: 'ovocieAZeleniny' },
                { model: this.prisma.napoje, category: 'napoje' },
                { model: this.prisma.mrazenePotraviny, category: 'mrazenePotraviny' },
                { model: this.prisma.mliecneVyrobkyAVajcia, category: 'mliecneVyrobkyAVajcia' },
                { model: this.prisma.masoRybyALahodky, category: 'masoRybyALahodky' },
                { model: this.prisma.grilovanie, category: 'grilovanie' },
                { model: this.prisma.alkohol, category: 'alkohol' },
            ];
        }

        const searchPromises = models.map(({ model, category }) => this.searchModelForTerm(model, searchTerm, sale, category));

        const searchResults = await Promise.all(searchPromises);
        const productsFromDb = searchResults.flat();

        const totalProducts = productsFromDb.length;
        const totalPages = Math.ceil(totalProducts / pageSize);
        const skip = (page - 1) * pageSize;

        const paginatedProducts = productsFromDb.slice(skip, skip + pageSize);

        const transformedProducts = paginatedProducts.map((product: any) => ({
            dbId: product.id, // Add dbId here
            productId: product.productId,
            title: product.title,
            price: product.price,
            unitPrice: product.unitPrice,
            imageUrl: product.imageUrl,
            unitOfMeasure: product.unitOfMeasure,
            isForSale: product.isForSale,
            aisleName: product.aisleName,
            superDepartmentName: product.superDepartmentName,
            category: product.category,
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
            availableCategories: Array.from(availableCategories),
        };
    }
}
