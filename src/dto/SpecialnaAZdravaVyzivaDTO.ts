export class PromotionDto {
    promotionId: string;
    promotionType: string;
    startDate: string;
    endDate: string;
    offerText: string;
    attributes: string[];
}

export class SpecialnaAZdravaVyzivaTransformedProductDto {
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

export class SpecialnaAZdravaVyzivaResponseDto {
    totalProducts: number;
    products: SpecialnaAZdravaVyzivaTransformedProductDto[];
}
