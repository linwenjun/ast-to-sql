const QNL = require('./src/qnl');
const q = new QNL();

console.log(q.parse('SELECT * FROM table1 where name like "%a"'));
console.log(q.parse('SELECT * FROM table2 where id = 1'));