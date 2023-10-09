export interface Brands {
    results:  number;
    metadata: Metadata;
    data:     list[];
}

export interface list {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
    nextPage:      number;
}
