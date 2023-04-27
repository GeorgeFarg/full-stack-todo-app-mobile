import ApiManager from "./ApiManager";


export const GetFullList = async (token: string | null) => {

    if(token === null) return;

    try {
        const result = await ApiManager('/lists',{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        })

        return result;

    } catch (err) {
        console.error(err);
    }
}