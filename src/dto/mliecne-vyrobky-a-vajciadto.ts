export class PromotionDto {
    promotionId: string;
    promotionType: string;
    startDate: string;
    endDate: string;
    offerText: string;
    attributes: string[];
}

export class MliecneVyrobkyAVajciaTransformedProductDto {
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
    hasPromotions: boolean; // Add this line
}

export class MliecneVyrobkyAVajciaResponseDto {
    totalProducts: number;
    totalPages: number;
    products: MliecneVyrobkyAVajciaTransformedProductDto[];
}
