export class PromotionDto {
    promotionId: string;
    promotionType: string;
    startDate: string;
    endDate: string;
    offerText: string;
    attributes: string[];
}

export class GrillovaneTransformedProductDto {
    productId: string;
    title: string;
    price: number;
    unitPrice: number;
    imageUrl: string;
    unitOfMeasure: string;
    isForSale: boolean;
    aisleName: string;
    promotions: PromotionDto[];
    lastUpdated: Date;
    superDepartmentName: string;
}

export class GrilovanieResponseDto {
    totalProducts: number;
    products: GrillovaneTransformedProductDto[];
}
