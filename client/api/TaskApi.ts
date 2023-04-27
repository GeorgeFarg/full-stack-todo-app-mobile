import ApiManager from "./ApiManager";

export const AddTask = async (data: any, token: string | null) => {
    try {
        const result = await ApiManager('/lists', {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            data,
        })

        return result;
    } catch (err) {
        return err;
    }
}

export const removeTask = async (id: string, token: string | null) => {
    try {
        const result = await ApiManager(`/lists/${id}`, {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            
        })

        return result;
    } catch (err) {
        return err;
    }
}
