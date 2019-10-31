const SubAstGenerator = require('./sub_ast_generator')

test('gen eql ast', () => {
  const sag = new SubAstGenerator();
  let result = sag.genBinExp('=', 'a', 1);
  let actual = { 
    type: 'binary_expr',
    operator: '=',
    left: { type: 'column_ref', table: null, column: 'a' },
    right: { type: 'number', value: 1 } 
  };

});

test('gen gt ast', () => {
  const sag = new SubAstGenerator();
  let result = sag.genBinExp('>', 'a', 2);
  let actual = { 
    type: 'binary_expr',
    operator: '>',
    left: { type: 'column_ref', table: null, column: 'a' },
    right: { type: 'number', value: 2 } 
  };

  expect(result).toEqual(actual);
});

test('gen between ast', () => {
  const sag = new SubAstGenerator();
  let result = sag.genBinExp('BETWEEN', 'a', 2, 3);
  let actual = { 
    type: 'binary_expr',
    operator: 'BETWEEN',
    left: { type: 'column_ref', table: null, column: 'a' },
    right: { 
      type: 'expr_list', 
      value: [ 
        { type: 'number', value: 2 },
        { type: 'number', value: 3 } 
      ]
    } 
  };

  expect(result).toEqual(actual);
});

test('gen like ast', () => {
  const sag = new SubAstGenerator();
  let result = sag.genBinExp('LIKE', 'field3', 'b');
  let actual = { 
    type: 'binary_expr',
    operator: 'LIKE',
    left: { type: 'column_ref', table: null, column: 'field3' },
    right: { 
      type: 'string', 
      value: 'b'     
    } 
  };

  expect(result).toEqual(actual);
});

test('gen AND ast', () => {
  const sag = new SubAstGenerator();
  let left = sag.genBinExp('LIKE', 'field3', 'b');
  let right = sag.genBinExp('BETWEEN', 'field4', 3, 4);

  let result = sag.genBinExp('AND', left, right);

  expect(result.right).toEqual({ 
    type: 'binary_expr',
    operator: 'BETWEEN',
    left: { type: 'column_ref', table: null, column: 'field4' },
    right: { 
      type: 'expr_list', 
      value: [ 
        { type: 'number', value: 3 },
        { type: 'number', value: 4 } 
      ]
    } 
  });
});