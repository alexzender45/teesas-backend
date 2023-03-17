import { Model } from 'objection';
import { BaseModel } from '../base';
import { TransactionModel } from './transactions.service';
import { TransactionValidation } from './transactions.validation';

describe('TransactionModel', () => {
  describe('Transaction DB Model', () => {
    it('should return be define', () => {
      expect(TransactionModel).toBeDefined();
    });

    it('should extend Objection Model class', () => {
      expect(TransactionModel.prototype).toBeInstanceOf(Model);
    });

    it('should extend the BaseModel class', () => {
      expect(TransactionModel.prototype).toBeInstanceOf(BaseModel);
    });

    it('should have a json schema', () => {
      expect(TransactionModel.jsonSchema).toBeDefined();
    });

    it('should have a schema validation', () => {
      expect(TransactionModel.jsonSchema).toEqual(TransactionValidation);
      expect(TransactionModel.jsonSchema.required).toEqual([
        'user_id',
        'product_id',
        'transaction_amount',
      ]);
    });
  });
});
