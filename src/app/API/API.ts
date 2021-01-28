import { PromocodeType, FAQType, PricesPathType, PriceItemType } from './../types/interfaces';
import axios from "axios";

//const token = 
const apiInstance = axios.create({
    baseURL: "https://us-central1-interactive-form-abee8.cloudfunctions.net/api/",
    headers: {
        authorization: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
        "Content-Type": "application/json"
    },
})



export const API = {
    signIn: async (password: string, email: string) => {
        try {
            const response = await apiInstance.post("signIn", { password, email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPrices: async (path: PricesPathType) => {
        try {
            const response = await apiInstance.get("prices" + path);
            console.log(response)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    setPrices: async (prices: PriceItemType, path: PricesPathType) => {
        try {
            const response = await apiInstance.post("prices" + path, prices);
            console.log(response)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPromocodes: async () => {
        try {
            const response = await apiInstance.get("promocode");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    setPromocode: async (promocode: { promocode: string, discount: number }) => {
        try {
            const response = await apiInstance.post("promocode", promocode);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deletePromocode: async (id: { id: string }) => {
        console.log(id)
        try {
            const response = await apiInstance.delete("promocode", { data: id });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Purchases
    getPurchases: async () => {
        try {
            const response = await apiInstance.get("purchase");
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //FAQ
    getFAQ: async () => {
        try {
            const response = await apiInstance.get("faq");
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addFAQ: async (body: string, title: string) => {
        try {
            const response = await apiInstance.post("faq", {body, title});
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteFAQ: async (id: string) => {
        try {
            const response = await apiInstance.delete("faq", { data: { id } });
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Users

    getUsers: async () => {
        try {
            const response = await apiInstance.post("account");
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }



}