import { Model } from 'objection';
import { BaseModel } from '../base';
import { ProductModel } from './products.service';
import { ProductValidation } from './products.validation';

describe('ProductModel', () => {
  describe('Product DB Model', () => {
    it('should return be define', () => {
      expect(ProductModel).toBeDefined();
    });

    it('should extend Objection Model class', () => {
      expect(ProductModel.prototype).toBeInstanceOf(Model);
    });

    it('should extend the BaseModel class', () => {
      expect(ProductModel.prototype).toBeInstanceOf(BaseModel);
    });

    it('should have a json schema', () => {
      expect(ProductModel.jsonSchema).toBeDefined();
    });

    it('should have a schema validation', () => {
      expect(ProductModel.jsonSchema).toEqual(ProductValidation);
      expect(ProductModel.jsonSchema.required).toEqual([
        'seller_id',
        'product_name',
        'cost',
        'amount_available',
      ]);
    });
  });
});
