import { Pipe, PipeTransform } from '@angular/core';
import { IDataset } from 'bebar';
//import { InterfaceConverter } from 'bebar';

@Pipe({
  name: 'datasetArray'
})
export class DatasetArrayPipe implements PipeTransform {

  transform(value: (IDataset | string)[] | IDataset | string | undefined): IDataset[] {
    if (value === undefined) {
      return [];
    } else if (Array.isArray(value)) {
      return value.map((curValue) => typeof(curValue) === 'string' ?
      {file: curValue} as IDataset :
      curValue);
    } else if (typeof(value) === 'string') {
      return [{file: value} as IDataset];
    }
    return [value];
  }
}
