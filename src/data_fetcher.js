const ops = ['=', '>', '<', '>=', '<=', 'BETWEEN']
const _ = require('lodash')

class DataFetcher {
  constructor(data) {
    this.data = data;
  }

  getFields() {
    return Object.keys(this.data[0]);
  }

  getValuesByField(field) {
    return this.data.map((value)=> {
      return value[field]
    });
  }

  getSingleRandomValueByField(field) {
    let idx = Math.floor(Math.random() * this.data.length);
    return this.data[idx][field];
  }

  getDoubleRandomValueByField(field) {
    let result = _.chain(this.data).map((val)=> {
      return val[field]
    }).shuffle().take(2).value();

    return result;
  }

  getSingleRandomField() {
    let fields = this.getFields();
    let idx = Math.floor(Math.random() * fields.length);
    return fields[idx];
  }

  

  getRandomValueByField(field, op) {
    if(op == 'BETWEEN') {
      return this.getDoubleRandomValueByField(field);
    } else {
      return this.getSingleRandomValueByField(field);
    }
  }

  genRandomsParamsForBinExp() {
    let idx = Math.floor(Math.random() * ops.length);
    let op = ops[idx];
    let field = this.getSingleRandomField();
    let value = this.getRandomValueByField(field, op);

    return [op, field].concat(value);
  }
}

module.exports = DataFetcher;