import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { PecivoResponseDto, PecivoTransformedProductDto, PromotionDto } from 'src/dto/pecivodto';

@Injectable()
export class PecivoService {
    private cookies: string;
    private csrfToken: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly prisma: PrismaService
    ) {
        this.cookies = ''; // Initialize cookies
    }

    private async fetchProductsFromApi(): Promise<PecivoTransformedProductDto[]> {

        const url = 'https://potravinydomov.itesco.sk/groceries/sk-SK/resources';
        const headers = {
            'accept': 'application/json',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'cookie': 'consumer=default; DCO=sdc; _csrf=3JI_vb6yziS89Z7kuTd_0bpS; itemsPerPage=48; atrc=7fce29a1-8065-43d3-85dc-f8fb26251f7a; cookiePreferences=%7B%22experience%22%3Atrue%2C%22advertising%22%3Atrue%7D; referrer=dGVzY28uc2s-L2dyb2Nlcmllcy9zay1TSy8; _abck=6A6626BE91AE2D4A96FA5505F56C4D58~0~YAAQNElnaLpCUrmPAQAAUvMa3gvpHPx5OTK6gtJ31MjO/JWNiuVKqjeUKAcRZW0Yal5l85hN5KrW0IYuGMrLvvIPjBVcZzb3zDDmUh9rnSO3PSmhOZfobd/0ULvZ6Tm8YA+2GD31/m8gK/YP/1+RVOS8+ObYfG5jKE6TIbyK81RYZ3+7KyN+Q5uANrEy3imw+OKOunyQMj1CqirpH0mEzXFwesQP7aL4Li4PVw03yq9BZ1UZPZ6jFmBU/FuEwxriB3FhrDGIWksGxhb8Tgvn9Ij2AydQWDAANOKQpWzEj68wOZ5dVYWIG5i1D27BAmQwMRhn2XBbixCMd55hzQBzX3+NjVWWrPGT038GQhdD/gAdeVhvZqLKQpPIK1d/o51TCmFGp9AcBvtMiq+fnA7andbsuoaHfVU=~-1~-1~-1; ak_bmsc=542187C143950BF4E7BAC62000628EE8~000000000000000000000000000000~YAAQNElnaLtCUrmPAQAAUvMa3hdygyhALX1E/T+sUYOdynpUde8RxdRvuuG4AbY65vZzkcJmZ2aSAylj2siRRBn5xBzvv++KEIQTi4urk7twV99YVqFjiRjcMtzVtQLzjMHsljGuuzNDGldfkp9n6nE5pMu7NTxw9gQ3855VvmsdUuYLWRQR0OaDnXjWGlcxXjZQZqd1F3gB8+Sr/LM/z2tUaM2qcaZQ/xEPMjUA+yl42bDR7EYEFe5ULOBZ0MsQleHrDlDm/grJUIhoBUKuOz4vaQd50sBa9vBoiKfQI1nq4KbbDAxJX5EoaxLSp1SkYQZrJB97f580bQsDMAfFw6kN7RQvvFXJzfkm/VEfgj6fcn+1k1HztUtq0LI6b0YsrieBOxKrKgmUZw==; bm_sz=273D2A8473D8BF2FF953E28788125F7C~YAAQNElnaL1CUrmPAQAAUvMa3hd0WcMJ914U0vreajNtN/6Z1NQ8b6FYYgK4DtxB1SJi+oounflHdopP6cfr3ljMDJkRB5Vb0Yssai/DLBa9upjQp0mUbQdxc35/OFHn/AdYTxLJPd2DglW1fDACp7W3C5UryweYVDHEuI/AhwMlID5fLqwqkYYsM9dE5I+E2XNstK0+XrFUXoDSQbntodTIF8RD5DqrTYnJWpaQflSMmuNUzyy0jNTZ+vE4a9/XK8d6/E3sKHzo1Qd2QebL25QuRAxv6eP5ngGrwzaufA4SZRRYnZ9h5n50K5EKo7hAochjRKTrwHUReWZBy8K2qIuR+I6eL2duANfE1bdTp7eRSIA6H35Vnj/t4SUHJ/zsNau2qBoR+e+uX3W3ato=~3752502~3618629; ighs-sess=eyJzdG9yZUlkIjoiMjEwMDQiLCJsb2NhdGlvblV1aWQiOiI0MDkxNWFhYy1iY2Q5LTRjMjktODVmNy1mMWNiODgyNDFmNmQiLCJhbmFseXRpY3NTZXNzaW9uSWQiOiJkNDA1NDE4MjJhNmRlYWVmMmYxZGIwMGEyNTQ1MDBjZiIsInJlcXVlc3RCYWNrdXBzIjpbeyJpZCI6ImY2NGE4ZGY3LWUwZmUtNGExZS1hMzI4LWQwN2VmNGE3YjYyNCIsIm1ldGhvZCI6IlBPU1QiLCJ1cmwiOiIvZ3JvY2VyaWVzL2NiZC1ycHQiLCJib2R5Ijp7ImVsIjoidHJ1ZSIsIl9jc3JmIjoiSWpDVUJNbXEtZC0xQkpRYTc4UWRJeVpzd0FJejdxNDJQc1M4In0sInRpbWVzdGFtcCI6MTcxNzQxODI2MDE5Mn1dfQ==; ighs-sess.sig=Vv2qteWDw_17OPJK9T19OyjQuKA; akavpau_slovakia_vp=1717418569~id=2be4a8552f69da039eb1ea88e82cbb28; bm_sv=162F339DC60E35724F7C2C7F0E76FA2A~YAAQNElnaBFDUrmPAQAAeBsb3hdeOYWuKNzvxSj1lFnWnuQ1HtCdhK2/m0CsFIrqELa1/zKD0b3pQVoZ2UAJNaDO+izmyojBM1AD2eMo6MV39jnXUZPxgsxr5ONp0yV1eTl48Td6IE4cnwgxpPDqX/CGEN3ZgeagPdQx8I2VDp9UAdbKa/pEP6HX4b4gaQBdAKtOuWRPahPpcAQMkCthGIeP1MzH0RDCDhECIZApfp3XM+CVCxYcCR2BbBB1Egw=~1',
            'origin': 'https://potravinydomov.itesco.sk',
            'pragma': 'no-cache',
            'referer': 'https://potravinydomov.itesco.sk/groceries/sk-SK/shop/ovocie-zelenina-a-kvety/all?viewAll=promotion&promotion=4294967272',
            'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'traceparent': '00-bb0414a40d7b2848f2335f9afc7e797b-c21551b32ff1b1ca-01',
            'tracestate': '3296235@nr=0-1-3512954-1134246125-c21551b32ff1b1ca----1717157111146',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            'x-csrf-token': 'IjCUBMmq-d-1BJQa78QdIyZswAIz7q42PsS8',
            'x-queueit-ajaxpageurl': 'false',
            'x-requested-with': 'XMLHttpRequest'
        };

        let allProducts: PecivoTransformedProductDto[] = [];
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
                            superdepartment: 'pecivo'
                        },
                        hash: '8148811669619233'
                    }
                ],
                sharedParams: {
                    superdepartment: 'pecivo',
                    query: { count: count.toString(), page: page.toString() },
                    referer: `/groceries/sk-SK/shop/pecivo/all?count=${count}&page=${page - 1}`
                },
                requiresAuthentication: false
            };

            try {
                console.log(`Fetching products with page: ${page}`); // Log the page number for each request
                const response = await firstValueFrom(this.httpService.post(url, body, { headers }));
                const transformedData = this.transformData(response.data);
                allProducts = allProducts.concat(transformedData.products);
                morePages = allProducts.length < transformedData.totalProducts;
                page += 1;
                console.log(`Total products fetched so far: ${allProducts.length}`); // Log the total products fetched so far
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }

        return allProducts;
    }

    private transformData(data: any): PecivoResponseDto {
        const productItems = data.productsByCategory.data.results.productItems;

        if (!productItems) {
            throw new Error('Unexpected response structure');
        }

        const transformedProducts: PecivoTransformedProductDto[] = productItems.map((item: any) => {
            const product = item.product;
            const promotions: PromotionDto[] = item.promotions?.map((promo: any) => ({
                promotionId: promo.promotionId,
                promotionType: promo.promotionType,
                startDate: promo.startDate,
                endDate: promo.endDate,
                offerText: promo.offerText,
                attributes: promo.attributes
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
                lastUpdated: new Date()
            };
        });

        return {
            totalProducts: data.productsByCategory.data.results.pageInformation.totalCount,
            products: transformedProducts,
        };
    }


    private async saveProductsToDb(products: PecivoTransformedProductDto[]) {
        for (const product of products) {
            try {
                // Create a new product record with a unique lastUpdated value
                await this.prisma.pecivo.create({
                    data: {
                        productId: product.productId,
                        title: product.title,
                        price: product.price,
                        unitPrice: product.unitPrice,
                        imageUrl: product.imageUrl,
                        unitOfMeasure: product.unitOfMeasure,
                        isForSale: product.isForSale,
                        aisleName: product.aisleName,
                        category: "pecivo",
                        superDepartmentName: product.superDepartmentName,
                        promotions: {
                            create: product.promotions.map(promo => ({
                                promotionId: promo.promotionId,
                                promotionType: promo.promotionType,
                                startDate: new Date(promo.startDate),
                                endDate: new Date(promo.endDate),
                                offerText: promo.offerText,
                                attributes: promo.attributes
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

    async getProducts(update: boolean): Promise<PecivoResponseDto> {
        if (update) {
            const productsFromApi = await this.fetchProductsFromApi();
            await this.saveProductsToDb(productsFromApi);
        }
        const productsFromDb = await this.prisma.pecivo.findMany({
            where: { category: 'pecivo' }, // Add this line
            include: { promotions: true },
            orderBy: { lastUpdated: 'desc' }
        });
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
                attributes: promo.attributes
            })),
            lastUpdated: product.lastUpdated
        }));
        return {
            totalProducts: transformedProducts.length,
            products: transformedProducts
        };
    }

    async getProductById(productId: string): Promise<PecivoTransformedProductDto[]> {
        const productsFromDb = await this.prisma.pecivo.findMany({
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
                attributes: promo.attributes
            })),
            lastUpdated: product.lastUpdated
        }));
    }


}
