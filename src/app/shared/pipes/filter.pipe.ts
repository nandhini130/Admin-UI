import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  public filteredData: any[] = [];

  transform(value: any, filterKeys: any): any {
    if (filterKeys == '') {
      return value;
    } else {
        filterKeys = filterKeys.toLocaleLowerCase();
        let tmpData = value.filter((data: any) => {
          if ( data.name.toLocaleLowerCase().includes(filterKeys) ||  
               data.email.toLocaleLowerCase().includes(filterKeys) || 
               data.role.toLocaleLowerCase().includes(filterKeys) ) {                
                return true;
          }
          return false;
        });
        this.filteredData = this.filteredData.concat(tmpData);
    }
    return this.filteredData;
  }
}
