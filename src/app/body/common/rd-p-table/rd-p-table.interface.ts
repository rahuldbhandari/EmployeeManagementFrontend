import { TooltipOptions } from "primeng/api";

/**
 * DataSource Interface for defining the data and header structure.
 * @template T Type of data rows in the table.
 */
export interface DataSource<T = any> {
    headers: DataHeader<T>[];
    data: T[];
    totalRecords: number;
}

/**
 * DataHeader Interface for table header configurations.
 * @template T Type of data rows.
 */
export interface DataHeader<T = any> {
    name: string;
    type?: string;
    fieldName: string;
    sortable?: boolean;
    filterable?:boolean;
    styleClass?: string;
    clickable?: boolean;
    ngClass?: (rowData: T) => string | string[] | Set<string> | { [klass: string]: any };
    width?: string;
    tooltip?: boolean;
    tooltipOptions?: TooltipOptions;
}

/**
 * DataQuery Interface for paginator and sorting details.
 */
export interface DataQuery {
    limit: number;
    skip: number;
    sortBy: SortParameter;
}

interface SortParameter {
    field: string;
    order: string;
}

/**
 * ActionButton Interface for configuring action buttons in the table.
 * @template T Type of data rows.
 */
export interface ActionButton<T = any> {
    label?: string;
    name: string;
    icon?: string;
    rounded?: boolean;
    severity?: "success" | "info" | "warning" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined;
    raised?: boolean;
    outlined?: boolean;
    text?: boolean;
    visibility?: (data: T) => boolean;
}
