class QNL {
  parse(sql) {
    let ast = parser.astify(sql, opt);
    let tableName = getTableName(ast);
    let condition = getCondition(ast.where);
    return `选择表${tableName}中记录,条件为 ${condition}`
  }
}

getTableName = (ast)=> {
  return ast.from[0].table;
}

getCondition = (node)=> {
  let left='', right='', result = '';
  
  if(node.left) {
    left = getCondition(node.left);
  }

  if(node.right) {
    right = getCondition(node.right);
  }

  let current = getNode(node);

  result = `${left}${current}${right}`
  
  return result;
}

getOp = (op)=> {
  switch(op.operator) {
    case '=':
      return '等于';
    case '>':
      return '大于';
    case '>=':
      return '不小于';
    case '<':
      return '小于';
    case '<=':
      return '不大于';
    case 'AND':
      return '并且';
    case 'OR':
      return '或者';
    case 'LIKE':
      return '包含';
    case 'NOT LIKE':
      return '不包含';
    default:
      return ''
  }
}

getString = (str)=> {
  const CONTAIN = /^%(.*)%$/
  const LEFT_CONTAIN = /^(.*)%$/
  const RIGHT_CONTAIN = /^%(.*)/

  if(CONTAIN.test(str)) {
    let result = CONTAIN.exec(str)
    return `"${result[1]}"的字符串`;
  }
  
  if(LEFT_CONTAIN.test(str)) {
    let result = LEFT_CONTAIN.exec(str);
    return `以"${result[1]}"开头的字符串`;
  }

  if(RIGHT_CONTAIN.test(str)) {
    let result = RIGHT_CONTAIN.exec(str);
    return `以"${result[1]}"结尾的字符串`;
  }

  return `${str}`;
}

getNode = (node)=> {
  switch(node.type) {
    case "binary_expr":
      return getOp(node);
    case "column_ref":
      return `字段${node.column}`;
    case "number":
      return node.value;
    case "string":
      return getString(node.value);
    default:
      return ""
  }
}

const opt = {
  database: 'MySQL' // MySQL is the default database
}
const { Parser } = require('node-sql-parser');
const parser = new Parser()

module.exports = QNL