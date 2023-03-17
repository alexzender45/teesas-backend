import { JSONSchema } from 'objection';

export const UserValidation: JSONSchema = {
  type: 'object',
  title: 'User Schema Validation',
  required: ['username', 'password', 'role'],
  properties: {
    username: { type: 'string' },
    role: { type: 'string' },
    password: { type: 'string' },
    deposit: { type: 'number' },
  },
};
