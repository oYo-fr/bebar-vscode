import { Pipe, PipeTransform } from '@angular/core';
import { IHelperset } from 'bebar/dist/index';

@Pipe({
  name: 'helpersetArray'
})
export class HelpersetArrayPipe implements PipeTransform {

  transform(value: (IHelperset | string)[] | IHelperset | string | undefined): IHelperset[] {
  if (value === undefined) {
    return [];
  } else if (Array.isArray(value)) {
    return value.map((curValue) => typeof(curValue) === 'string' ?
    {file: curValue} as IHelperset :
    curValue);
  } else if (typeof(value) === 'string') {
    return [{file: value} as IHelperset];
  }
  return [value];
  }
}
