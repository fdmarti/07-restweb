export class GetTodoDto {
    constructor(
        public readonly id : string
    ){}

    static get(props : {[key:string]: any}) : [string?, GetTodoDto?]{
        const { id } = props

        if ( !id ) return ['Invalid ID'];

        return [undefined, new GetTodoDto(id)]
    }
}