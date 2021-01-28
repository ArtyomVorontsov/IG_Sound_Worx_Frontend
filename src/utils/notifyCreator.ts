import { idGenerator } from "./idGenerator";

export const notifyCreator = (data: string, status: number) => {
    return {
        data,
        status,
        id: idGenerator()
    }
}
