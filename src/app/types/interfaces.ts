import store from "../redux/store";

const state = store.getState();
export type StateType = typeof state;


export type PriceItemType = {
    title?: string,
    name?: string

    quantityOfStems?: Array<StemType>,
    EUR?: number,
    USD?: number,
    additionalEdit?: AdditionalEditType,
    features: Array<string>
}



export type PromocodeType = {
    discount: number,
    id: string,
    promocode: string
}


export type CurrencyType = "EUR" | "USD"

export type InvoiceItemType = {
    name: string,
    currency: CurrencyType,
    description: string,
    unit_amount: {
        value: number,
        currency_code: CurrencyType
    },
    quantity: number | string
}

export type PurchaseItemType = {
    invoice: {
        note_to_payer: string,
        name: {
            full_name: string
        },
        items: Array<InvoiceItemType>,
        amount: {
            currency_code: CurrencyType,
            breakdown: {
                shipping_discount: {
                    currency_code: CurrencyType,
                    value: number | string
                },
                discount: {
                    value: number | string,
                    currency_code: CurrencyType
                },
                item_total: {
                    currency_code: CurrencyType,
                    value: number | string
                },
                insurance: {
                    value: number | string,
                    currency_code: CurrencyType
                },
                handling: {
                    value: number | string,
                    currency_code: CurrencyType
                },
                tax_total: {
                    currency_code: CurrencyType,
                    value: number | string
                },
                shipping: {
                    value: number | string,
                    currency_code: CurrencyType
                }
            },
            value: number
        }
    },
    purchaseInfo: {
        email: string,
        full_name: string,
        description: string
    },
    id: string
}


export type FAQType = {
    body: string,
    title: string,
    id: string
}



// {
//     "userPurchasesCount": 21,
//     "purchasesId": [
//         "471041041",
//         "777110464",
//     ],
//     "isAdmin": true,
//     "username": "admin",
//     "email": "admin@admin.com"
// }


export type UserType = {
    userPurchasesCount: number,
    purchasesId: Array<string>,
    isAdmin: boolean,
    username: string,
    email: string
}


export type ErrorType = {
    data: string,
    status: number
    id: string
}

export type SuccessType = {
    data: string,
    status?: number,
    id: string
}


export type FormValuesType = {
    total: number
    email: string
    full_name: string

    productionAssistance: { price: { EUR: number, USD: number }, count: number }
    trackProduction: { price: { EUR: number, USD: number }, count: number },

    stemMastering: { price: { EUR: number, USD: number }, count: number }
    stereoMastering: { price: { EUR: number, USD: number }, count: number }
    additionalEdit: { price: { EUR: number, USD: number }, count: number }
    mixingAndMastering: { price: { EUR: number, USD: number }, count: number }

    description: string,
    link: string,
    promocode: string,
    discount: number,
    price: number,
    currency: CurrencyType
    note_to_payer: string
}


export type PricesPathType = "/mixingAndMastering" | "/stemMastering" | "/stereoMastering" | "/productionAssistance" | "/trackProduction" | "/all";
export type PricesProductsNamesType = "mixingAndMastering" | "stemMastering" | "stereoMastering" | "productionAssistance" | "trackProduction";

export type AdditionalEditType = {
    EUR: number,
    USD: number,
    features: Array<string>
}

interface Prices {
    features: Array<string>
    additionalEdit: AdditionalEditType
}

export type StemType = { quantity: { from: number, to: number }, EUR: number, USD: number, id: number }

export interface StemMasteringType extends Prices {
    quantityOfStems: Array<StemType>,
}

export interface StereoMasteringType extends Prices {
    EUR: number,
    USD: number,
}

export interface FieldType { key: string, value: { count: number, price: { EUR: number, USD: number } } | boolean | string | number | CurrencyType }


export type ItemType = {
    quantity: number,
    price: number,
    name: string
}

export interface PurchaseType {
    description: string, 
    email: string, 
    full_name: string,
    discount: number,
    price: number,
    currency: CurrencyType,
    note_to_payer: string,
    items: Array<ItemType>
}