const data = require('./MOCK_DATA.json');
const DataFetcher = require('./src/data_fetcher');
const SubAstGenerator = require('./src/sub_ast_generator');
const QNL = require('./src/qnl');
const { Parser } = require('node-sql-parser');

let parser = new Parser()
let dfetcher = new DataFetcher(data);
let sag = new SubAstGenerator();
let qnl = new QNL();

const ast = parser.astify("Select * from t1");

function genRandomQuiz() {
  if(Math.random() > 0.5) {
    let [op, f1, ...vals] = dfetcher.genRandomsParamsForBinExp();

    let s1 = sag.genBinExp(op, f1, ...vals);
    let tast = Object.assign({}, ast, {where: s1});
    let l1 = qnl.parse(tast)
    let sql1 = parser.sqlify(tast)
    console.log(sql1);
    console.log(l1);
  } else {
    let [op1, f1, ...vals1] = dfetcher.genRandomsParamsForBinExp();
    let [op2, f2, ...vals2] = dfetcher.genRandomsParamsForBinExp();

    let s1 = sag.genBinExp(op1, f1, ...vals1);
    let s2 = sag.genBinExp(op2, f2, ...vals2);
    let s = sag.genBinExp("AND", s1, s2)
    let tast = Object.assign({}, ast, {where: s});
    let l1 = qnl.parse(tast)
    let sql1 = parser.sqlify(tast)
    console.log(sql1);
    console.log(l1);
  }
}

for(i=0; i<100; i++) {
  genRandomQuiz();
  console.log('-----------------')
}







