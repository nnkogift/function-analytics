import { Fetcher } from '../core/fetcher';

export class IdentifiableObject extends Fetcher {
  constructor() {
    super();
    this._filters = [];
  }
  get name() {
    throw Error('Object name not implemented');
  }
  where(right, operator, left) {
    this._filters.push({
      right: right,
      operator: operator,
      left: left
    });
    return this;
  }

  get url() {
    var url = this.name + '.json?';

    this._filters.forEach((filter) => {
      url += 'filter=' + filter.right;
      if (filter.operator === '==') {
        url += ':eq:' + filter.left;
      } else if (filter.operator === '<') {
        url += ':lt:' + filter.left;
      } else if (filter.operator === '<=') {
        url += ':le:' + filter.left;
      } else if (filter.operator === '>') {
        url += ':gt:' + filter.left;
      } else if (filter.operator === '>=') {
        url += ':ge:' + filter.left;
      } else if (filter.operator === '<>') {
        url += ':!eq:' + filter.left;
      } else if (!filter.left) {
        url += ':' + filter.operator;
      } else {
        url += ':' + filter.operator + ':' + filter.left;
      }
    });
    return url;
  }
}
