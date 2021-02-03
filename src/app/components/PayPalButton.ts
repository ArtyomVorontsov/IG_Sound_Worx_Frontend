import { invoiceGenerator } from './../../utils/invoiceGenerator';
import { FormValuesType } from "../types/interfaces";

export const renderPayPalButton = (formValues: FormValuesType, checkout, history) => {

    const items = {
        "mixingAndMastering": formValues.mixingAndMastering,
        "productionAssistance": formValues.productionAssistance,
        "stemMastering": formValues.stemMastering,
        "stereoMastering": formValues.stereoMastering,
        "trackProduction": formValues.trackProduction,
        "additionalEdit": formValues.additionalEdit
    }

    const newItems = []

    for (const key in items) {
        newItems.push({
            name: key,
            quantity: items[key].count,
            price: items[key].price[formValues.currency]
        })
    }

    setTimeout(() => {
        //@ts-ignore
        window.paypal.Buttons({
            createOrder: (data, actions) => {

                const purchase_units = invoiceGenerator(
                    newItems, formValues.discount, formValues.price,
                    formValues.full_name, formValues.currency,
                    formValues.note_to_payer
                );


                console.log(purchase_units)
                return actions.order.create(
                    purchase_units
                )
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
                await checkout();
                history.push("/purchaseFinish")
            },
            onError: err => {
                console.error(err);
            },
        }).render("#paypal-button")
    });

}
