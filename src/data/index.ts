import basicSyntax from './basic-syntax.json';
import destructuring from './destructuring.json';
import spreadOperator from './spread-operator.json';
import callbackFunction from './callback-function.json';
import mappingFiltering from './mapping-filtering.json';
import asynchronous from './asynchronous.json';

export interface Chapter {
  id: string;
  title: string;
  data: any;
}

export const chapters: Chapter[] = [
  {
    id: 'basic-syntax',
    title: '1. Basic Syntax',
    data: basicSyntax,
  },
  {
    id: 'destructuring',
    title: '2. Destructuring',
    data: destructuring,
  },
  {
    id: 'spread-operator',
    title: '3. Spread Operator',
    data: spreadOperator,
  },
  {
    id: 'callback-function',
    title: '4. Callback Function',
    data: callbackFunction,
  },
  {
    id: 'mapping-filtering',
    title: '5. Mapping & Filtering',
    data: mappingFiltering,
  },
  {
    id: 'asynchronous',
    title: '6. Asynchronous',
    data: asynchronous,
  },
];
