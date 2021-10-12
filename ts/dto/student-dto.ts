export class Student{
    constructor(public id: string,
                public name: string,
                public address: string,
                public contact: string | null = null,
                public picture: string | null = null){}
}