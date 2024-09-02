import { Employee } from "./employee.model";

export interface PaginatorResponse {
    result:     Result;
    statusCode: number;
    message:    null;
}

export interface Result {
    data:         any[];
    pageNumber:   number;
    pageSize:     number;
    totalRecords: number;
}
