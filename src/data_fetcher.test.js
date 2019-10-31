const DataFetcher = require('./data_fetcher');

const initData = [
  {id: 1, name: 'abc'},
  {id: 2, name: 'def'},
  {id: 3, name: 'hij'}
]

const df = new DataFetcher(initData);

test('select BETWEEN', () => {
  expect(df.getFields()).toEqual(['id', 'name'])
});

test('select BETWEEN', () => {
  expect(df.getValuesByField('id')).toEqual([1, 2, 3])
});

beforeEach(()=> {
  _mathRandom = Math.random;
})

afterEach(()=> {
  Math.random = _mathRandom
})

test('test gen single random value', ()=> {
  Math.random = jest.fn();
  Math.random.mockReturnValueOnce(0.3);

  let result = df.getSingleRandomValueByField('id');
  expect(result).toBe(1);
})

test('test gen single random value', ()=> {
  Math.random = jest.fn();
  Math.random.mockReturnValueOnce(0.5);

  let result = df.getSingleRandomValueByField('id');
  expect(result).toBe(2);
})

test('test gen single random value', ()=> {

  Math.random = jest.fn();
  Math.random.mockReturnValueOnce(0.7);
  
  let result = df.getSingleRandomValueByField('name');
  expect(result).toBe('hij');
})

test('test gen single random field', ()=> {

  Math.random = jest.fn();
  Math.random.mockReturnValueOnce(0.3);
  
  let result = df.getSingleRandomField();
  expect(result).toBe('id');
})

test('test gen  random field', ()=> {

  Math.random = jest.fn();
  Math.random.mockReturnValue(0.01);
  
  let [op] = df.genRandomsParamsForBinExp();
  
  expect(op).toBe('=');
})