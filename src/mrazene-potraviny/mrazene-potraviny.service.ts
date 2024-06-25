import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { defaultHeaders } from 'src/common/header';
import { MrazenePotravinyResponseDto, MrazenePotravinyTransformedProductDto, PromotionDto } from 'src/dto/MrazenePotravinyDTO';

@Injectable()
export class MrazenePotravinyService {
    private cookies: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly prisma: PrismaService
    ) {
        this.cookies = ''; // Initialize cookies
    }

    private async fetchProductsFromApi(): Promise<MrazenePotravinyTransformedProductDto[]> {
        const url = 'https://potravinydomov.itesco.sk/groceries/sk-SK/resources';
        const headers = { ...defaultHeaders }

        let allProducts: MrazenePotravinyTransformedProductDto[] = [];
        let count = 48;
        let page = 1;
        let morePages = true;

        while (morePages) {
            const body = {
                resources: [
                    {
                        type: 'productsByCategory',
                        params: {
                            query: { count: count.toString(), page: page.toString() },
                            superdepartment: 'mrazene-potraviny'
                        },
                        hash: '8148811669619233'
                    }
                ],
                sharedParams: {
                    superdepartment: 'mrazene-potraviny',
                    query: { count: count.toString(), page: page.toString() },
                    referer: `/groceries/sk-SK/shop/mrazene-potraviny/all?count=${count}&page=${page - 1}`
                },
                requiresAuthentication: false
            };

            try {
                console.log(`Fetching products with page: ${page}`); // Log the page number for each request
                const response = await firstValueFrom(this.httpService.post(url, body, { headers }));
                const transformedProducts = this.transformData(response.data);
                allProducts = allProducts.concat(transformedProducts);
                morePages = allProducts.length < response.data.productsByCategory.data.results.pageInformation.totalCount;
                page += 1;
                console.log(`Total products fetched so far: ${allProducts.length}`); // Log the total products fetched so far
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }

        return allProducts;
    }

    private extractPromotionPrice(offerText: string): number | null {
        const match = offerText.match(/S Clubcard ([0-9,.]+) €/);
        return match ? parseFloat(match[1].replace(',', '.')) : null;
    }

    private transformData(data: any): MrazenePotravinyTransformedProductDto[] {
        const productItems = data.productsByCategory.data.results.productItems;

        if (!productItems) {
            throw new Error('Unexpected response structure');
        }

        return productItems.map((item: any) => {
            const product = item.product;
            const promotions: PromotionDto[] = item.promotions?.map((promo: any) => ({
                promotionId: promo.promotionId,
                promotionType: promo.promotionType,
                startDate: promo.startDate,
                endDate: promo.endDate,
                offerText: promo.offerText,
                attributes: promo.attributes,
                promotionPrice: this.extractPromotionPrice(promo.offerText) // Extract the promotion price
            })) || [];

            return {
                productId: product.id,
                title: product.title,
                price: product.price,
                unitPrice: product.unitPrice,
                imageUrl: product.defaultImageUrl,
                unitOfMeasure: product.unitOfMeasure,
                isForSale: product.isForSale,
                aisleName: product.aisleName,
                superDepartmentName: product.superDepartmentName,
                promotions,
                hasPromotions: promotions.length > 0,
                lastUpdated: new Date()
            };
        });
    }

    private async saveProductsToDb(products: MrazenePotravinyTransformedProductDto[]) {
        for (const product of products) {
            try {
                // Create a new product record with a unique lastUpdated value
                await this.prisma.mrazenePotraviny.create({
                    data: {
                        productId: product.productId,
                        title: product.title,
                        price: product.price,
                        unitPrice: product.unitPrice,
                        imageUrl: product.imageUrl,
                        unitOfMeasure: product.unitOfMeasure,
                        isForSale: product.isForSale,
                        aisleName: product.aisleName,
                        category: 'mrazene-potraviny',
                        superDepartmentName: product.superDepartmentName,
                        hasPromotions: product.hasPromotions,
                        promotions: {
                            create: product.promotions.map(promo => ({
                                promotionId: promo.promotionId,
                                promotionType: promo.promotionType,
                                startDate: new Date(promo.startDate),
                                endDate: new Date(promo.endDate),
                                offerText: promo.offerText,
                                attributes: promo.attributes,
                                promotionPrice: promo.promotionPrice // Save the promotion price
                            }))
                        },
                        lastUpdated: new Date()
                    }
                });
            } catch (error) {
                console.error('Error saving product to DB:', error);
                throw error;
            }
        }
    }

    async getProducts(update: boolean, page: number, pageSize: number, sale?: boolean): Promise<MrazenePotravinyResponseDto> {
        if (update) {
            const productsFromApi = await this.fetchProductsFromApi();
            await this.saveProductsToDb(productsFromApi);
        }

        const whereClause: any = { category: 'mrazene-potraviny' };

        // Assuming `sale` is a string that can be "true" or "false"
        if (sale !== undefined) {
            // Convert string to boolean
            const saleBoolean = String(sale).toLowerCase() === 'true';
            whereClause.hasPromotions = saleBoolean;
        }

        const [productsFromDb, totalProducts] = await this.prisma.$transaction([
            this.prisma.mrazenePotraviny.findMany({
                where: whereClause,
                include: { promotions: true },
                orderBy: { lastUpdated: 'desc' },
                skip: (page - 1) * pageSize,
                take: pageSize
            }),
            this.prisma.mrazenePotraviny.count({
                where: whereClause
            })
        ]);

        const totalPages = Math.ceil(totalProducts / pageSize);

        const transformedProducts = productsFromDb.map(product => ({
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
                promotionPrice: promo.promotionPrice // Include promotionPrice here
            })),
            hasPromotions: product.promotions.length > 0,
            lastUpdated: product.lastUpdated,
        }));

        return {
            totalPages,
            totalProducts,
            products: transformedProducts
        };
    }

    async updateProductsFromApi(): Promise<void> {
        const productsFromApi = await this.fetchProductsFromApi();
        await this.saveProductsToDb(productsFromApi);
    }

    async getProductById(productId: string): Promise<MrazenePotravinyTransformedProductDto[]> {
        const productsFromDb = await this.prisma.mrazenePotraviny.findMany({
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
                promotionPrice: promo.promotionPrice // Include promotionPrice here
            })),
            hasPromotions: product.promotions.length > 0,
            lastUpdated: product.lastUpdated
        }));
    }
}
