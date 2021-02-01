import { InvoiceItemType, ItemType } from '../app/types/interfaces';

export const invoiceGenerator = (items: ItemType[], discount: number, price: number, full_name: string, currency: "USD" | "EUR", note_to_payer: string) => {

    const itemsGenerator = (items: Array<ItemType>) => {

        const invoiceItems: Array<InvoiceItemType> = []

        items.forEach((item) => {
            if (item.quantity > 0) {
                invoiceItems.push({
                    name: item.name,
                    quantity: item.quantity.toString(),
                    currency,
                    description: "",
                    unit_amount: {
                        currency_code: currency,
                        value: item.price / item.quantity
                    }
                })
            }
        })

        return invoiceItems;
    }

    const purchase_units = {
        note_to_payer,
        description: "",
        amount: {
            currency_code: currency,
            value: price - discount,
            breakdown: {
                item_total: { "currency_code": currency, "value": price },
                shipping: { "currency_code": currency, "value": "0" },
                tax_total: { "currency_code": currency, "value": "0" },
                discount: { "currency_code": currency, "value": discount },
                handling: { "currency_code": currency, "value": "0" },
                insurance: { "currency_code": currency, "value": "0" },
                shipping_discount: { "currency_code": currency, "value": "0" },
            }
        },

        name: {
            full_name
        },
        items: itemsGenerator(items)
    }

    return { purchase_units: [purchase_units] };
}
