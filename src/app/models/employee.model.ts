export interface Employee {
    birthDate: Date;
    firstName: string;
    lastName:  string;
    gender:    Gender;
    hireDate:  Date;
}

export enum Gender {
    F = "F",
    M = "M",
}