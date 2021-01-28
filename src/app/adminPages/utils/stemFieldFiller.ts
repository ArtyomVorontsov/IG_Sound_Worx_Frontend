import { StemType } from '../../types/interfaces';


export const stemFieldFiller = (fields) => {
    const filledFields = []
    fields.map((item: StemType) => {
        filledFields.push(
            { name: ["quantityOfStems", item.id, "id"], value: item.id },
            { name: ["quantityOfStems", item.id, "quantity", "from"], value: item.quantity.from },
            { name: ["quantityOfStems", item.id, "quantity", "to"], value: item.quantity.to },
            { name: ["quantityOfStems", item.id, "EUR"], value: item.EUR },
            { name: ["quantityOfStems", item.id, "USD"], value: item.USD }
        )
    })

    return filledFields;
}
