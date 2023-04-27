import ApiManager from "./ApiManager";

type data = {
    name: string,
    password: string
}

export const validateToken = async (token: string | null) => {
    const result = await ApiManager('/validateToken', {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    })
    return result
}


export const userLogin = async (data: data) => {
    try {
        const result = await ApiManager('/auth', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            data,
        })

        return result;
    } catch (err) {
        return err;
    }
}

type userRegister = {
    name: string,
    email: string,
    password: string,
};
export const userSignup = async (data: userRegister) => {
    try {
        const result = await ApiManager('/users', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            data,
        })

        return result;
    } catch (err) {
        return err;
    }
}



export const GetUserData = async (token: string | null) => {

    if(token === null) return;

    try {
        const result = await ApiManager('/users',{
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

export const EditUserData = async (data: any, token: string | null) => {

    if(data === null) return;

    try {
        const result = await ApiManager('/users',{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            data: {
                name: data.username,
                email: data.email
            }
        })

        return result;

    } catch (err) {
        console.error(err);
    }
}