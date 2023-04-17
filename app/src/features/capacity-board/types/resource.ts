export interface IResourceRow {
    id: string;
    name: string;
    color: string;
    resourceTypes: IResourceType[];
    hasBookings: boolean;
}

export interface IResourceType {
    id: string;
    name: string;
}
