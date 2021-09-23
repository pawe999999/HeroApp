import { FilterOptions } from '../shared/enums/filterOption.enum';

export interface FilterSettings {
    filterType: FilterOptions;
    filterValue?: string;
}
