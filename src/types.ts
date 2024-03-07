export interface user {
    id : number,
    username : string,
    avatar : string
}

export interface task {
    id : number,
    title : string,
    state : string,
    affected_user_id : number,
    tags : string[]
}