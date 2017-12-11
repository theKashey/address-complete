interface AddressResponse {
    id: number,
    text: string,
}

interface DetailedAddressResponse extends AddressResponse {
    point: number[],
    addressDetails: {
        country: {
            name: string,
            code?: string
        },
        region: {
            name: string,
            code?: string,
        },
        locality: {
            name: string
        },
        street: {
            name: string,
            house: string,
            label: string,
        },
        postalcode: string
    }
}

interface IProvider {
    /**
     * Perform search
     * @param {string} name - entity to search
     * @param {Object} options
     * @return {Promise.<AddressResponse>}
     */
    search(name: string, options?: Object): Promise<AddressResponse>;

    /**
     * Request additional details
     * @param {Object} item - an item from search response
     * @return {Promise.<DetailedAddressResponse>}
     */
    getDetails(item: AddressResponse): Promise<DetailedAddressResponse>

    /**
     * Returns copyright information
     * @return {string}
     */
    getBadge(): string
}

interface IDetailedProvider extends IProvider {
    search(name: string, options?: Object): Promise<DetailedAddressResponse>;
}

type IConfigure = (apiKey: string, countries?: any, settings?: any) => void;

export {
    IProvider,
    IDetailedProvider,
    AddressResponse,
    DetailedAddressResponse,
    IConfigure
}