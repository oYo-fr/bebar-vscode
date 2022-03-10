import { Pipe, PipeTransform } from '@angular/core';
import { IPartialset } from 'bebar';

@Pipe({
  name: 'partialsetArray'
})
export class PartialsetArrayPipe implements PipeTransform {

  transform(value: (IPartialset | string)[] | IPartialset | string | undefined): IPartialset[] {
    if (value === undefined) {
      return [];
    } else if (Array.isArray(value)) {
      return value.map((curValue) => typeof(curValue) === 'string' ?
      {file: curValue} as IPartialset :
      curValue);
    } else if (typeof(value) === 'string') {
      return [{file: value} as IPartialset];
    }
    return [value];
  }
}
