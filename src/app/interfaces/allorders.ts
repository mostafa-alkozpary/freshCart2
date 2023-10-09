export interface AllOrders {
    shippingAddress:   ShippingAddress;
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: string;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              User;
    cartItems:         CartItem[];
    paidAt:            Date;
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
}

export interface CartItem {
    count:   number;
    _id:     string;
    product: Product;
    price:   number;
}

export interface Product {
    subcategory:     Brand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    imageCover:      string;
    category:        Brand;
    brand:           Brand;
    ratingsAverage:  number;
    id:              string;
}

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: Category;
}

export enum Category {
    The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
    The6439D5B90049Ad0B52B90048 = "6439d5b90049ad0b52b90048",
}

export interface ShippingAddress {
    details: string;
    phone:   string;
    city:    string;
}

export interface User {
    _id:   string;
    name:  string;
    email: string;
    phone: string;
}
