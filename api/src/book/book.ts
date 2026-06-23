import crypto from "node:crypto"

export class Book {
    constructor(
        public title: string,
        public authors: string[],
        public publisher: string,
        public pageCount: number,
        public rating: number,
        public cover: string,
        public isAvailable: boolean,
        public id = crypto.randomUUID()
    ) { }
}