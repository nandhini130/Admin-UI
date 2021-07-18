import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  public filteredData: any[] = [];

  transform(value: any, filterKeys: any): any {
    let isFiltered: boolean = false;
 
    if (filterKeys == '') {
      return value;
    } else {
        filterKeys = filterKeys.toLocaleLowerCase();

        let tmpData = value.filter((data: any) => {
          
          
          if ( data.name.toLocaleLowerCase().includes(filterKeys) ||  
               data.email.toLocaleLowerCase().includes(filterKeys) || 
               data.role.toLocaleLowerCase().includes(filterKeys) ) {

                console.log(data);
                
                return true;
          }

          return false;

        });

        console.log(tmpData);
        
        this.filteredData = this.filteredData.concat(tmpData);
       

        // this.getFilteredData(rpdata, isFiltered);
    }

    return this.filteredData;
  }
  
  getFilteredData(filteredValues: any, isFiltered: boolean) {
    let result: any[] = [];
    if (!isFiltered) {
      result = filteredValues;
      isFiltered = true;
    } else {
      result = result.concat(filteredValues);
    }
    result = [...new Set(result)];
    this.filteredData = result;
  }

}
