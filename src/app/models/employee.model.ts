export interface Employee {
    jonmoTarikh: Date;
    prothomNaam: string;
    seshNaam:  string;
    lingo:    Gender;
    hireDate:  Date;
}

export enum Gender {
    F = "F",
    M = "M",
}