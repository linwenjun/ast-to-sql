

class SubAstGenerator {
  genBinExp(type, field, ...params) {
    let base = {
      type: 'binary_expr',
      operator: type,
      left: { type: 'column_ref', table: null, column: field }
    }
    let extra;

    switch(type) {
      case 'AND':
          extra = {
            left: field,
            right: params[0]
          }
          break;
      case 'BETWEEN':
          extra = {
            right: getRightNodeForBetween(params)
          }
          break;
      default:
          extra = {
            right: { type: getType(params[0]), value: params[0] } 
          }
    }
    
    return  Object.assign({}, base, extra)
  }
}

function getRightNodeForBetween(params) {
  return {
    type: 'expr_list', 
    value: [ 
      { type: getType(params[0]), value: params[0] }, 
      { type: getType(params[1]), value: params[1] } 
    ]
  }
}

function getType(value) {
  return typeof(value);
}

module.exports = SubAstGenerator;