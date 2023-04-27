export type task = {
    id?: string,
    title: string,
    description: string,
    isFinished: boolean
}

export type list = {
    id? : string,
    list: task[],
    userId?: string
}