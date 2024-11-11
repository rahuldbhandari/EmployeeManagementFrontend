
export interface ApiResponse<T> {
    result:       T;
    statusCode:   number;
    errorMessage: null;
}


export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    skip:  number;
    limit: number;
  }
  
  export interface Permission {
    acc_id:            number;
    ref_no:            null;
    ia_flag:           string;
    ifsc:              string;
    uono:              string;
    uono_date:         Date;
    status:            string;
    last_process_date: Date;
    last_process_flag: number;
}


export interface DynamicQuery {
    skip:    number;
    limit:     number;
    filterBy?: any[];
    sortBy?:   SortBy;
}

export interface SortBy {
    field: string;
    order: string;
}