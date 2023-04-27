export type userTemplate = {
    password: string
} & userTemplateNoPassword

export type userTemplateNoPassword = {
    id?: string,
    name: string,
    email: string,
}
