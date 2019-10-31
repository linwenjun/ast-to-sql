const { Parser } = require('node-sql-parser');
const parser = new Parser()

const QNL = require("./qnl")
const qnl = new QNL();
test('select', () => {
  let sql = "SELECT t.name as n FROM t where a=1";
  let ast = parser.astify(sql);
  let result = qnl.parse(ast);

  expect(result).toBe("选择表t中记录,条件为 字段a等于1");
});

test('select', () => {
  let sql = "SELECT t.name as n FROM t where a=1 AND b>=2 OR c>0";
  let ast = parser.astify(sql);
  let result = qnl.parse(ast);

  expect(result).toInclude("选择表t中记录,条件为 字段a等于1并且字段b不小于2或者字段c大于0");
});


test('select 3 condition', () => {
  let sql = "SELECT t.name as n FROM t where a = 1 AND b>=2 OR c>0";
  let ast = parser.astify(sql);
  let result = qnl.parse(ast);

  expect(result).toInclude("选择表t中记录,条件为 字段a等于1并且字段b不小于2或者字段c大于0");
});

test('select between', () => {
  let sql = "SELECT * FROM t where a between 1 and 2";
  let ast = parser.astify(sql);
  let result = qnl.parse(ast);

  expect(result).toEqual("选择表t中记录,条件为 字段a在以下值之间['1', '2']");
});