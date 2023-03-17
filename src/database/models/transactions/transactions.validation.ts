import { JSONSchema } from 'objection';

export const TransactionValidation: JSONSchema = {
  type: 'object',
  title: 'Transaction Schema Validation',
  required: ['user_id', 'product_id', 'transaction_amount'],
  properties: {
    user_id: { type: 'string' },
    product_id: { type: 'string' },
    transaction_amount: { type: 'number' },
  },
};
