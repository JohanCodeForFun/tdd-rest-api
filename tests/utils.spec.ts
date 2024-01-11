import * as index from '../src/utils';

describe('index', () => {
  it('exports the correct functions', () => {
    expect(index).toHaveProperty('validateAddress');
    expect(index).toHaveProperty('validateEmail');
    expect(index).toHaveProperty('validateCity');
    expect(index).toHaveProperty('validateCountry');
    expect(index).toHaveProperty('validateName');
    expect(index).toHaveProperty('validateZipCode');
    expect(index).toHaveProperty('validatePersonalNumber');
  });
});