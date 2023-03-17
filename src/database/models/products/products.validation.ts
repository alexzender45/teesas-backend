import { JSONSchema } from 'objection';

export const ProductValidation: JSONSchema = {
  type: 'object',
  title: 'Product Schema Validation',
  required: ['seller_id', 'product_name', 'cost', 'amount_available'],
  properties: {
    seller_id: { type: 'string' },
    product_name: { type: 'string' },
    cost: { type: 'number' },
    amount_available: { type: 'number' },
  },
};
