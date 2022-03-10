import { Pipe, PipeTransform } from '@angular/core';
import { ITemplate } from 'bebar';


@Pipe({
  name: 'templateArray'
})
export class TemplateArrayPipe implements PipeTransform {

  transform(value: (ITemplate)[] | ITemplate | undefined): ITemplate[] {
    if (value === undefined) {
      return [];
    } else if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }}
