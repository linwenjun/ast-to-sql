const QNL = require("./qnl")

test('select', () => {
  const qnl = new QNL();

  let sqlStat = "SELECT t.name as n FROM t where a=1";
  let result = qnl.parse(sqlStat);

  expect(result).toInclude("选择表t中记录,条件为 字段a等于1");
});

test('select', () => {
  const qnl = new QNL();

  let sqlStat = "SELECT t.name as n FROM t where a=1 AND b>=2 OR c>0";
  let result = qnl.parse(sqlStat);

  expect(result).toInclude("选择表t中记录,条件为 字段a等于1并且字段b不小于2或者字段c大于0");
});