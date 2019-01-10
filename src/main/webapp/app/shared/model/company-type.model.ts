export interface ICompanyType {
    id?: number;
    name?: string;
}

export class CompanyType implements ICompanyType {
    constructor(public id?: number, public name?: string) {}
}
