import z from 'zod';

export const ZString = z.string().trim().min(1);

export const ZStringEmpty = z.string().trim();

export const ZDate = z.coerce.date();

export const ZNumber = z.coerce.number();

export const ZInteger = z.coerce.number().int();

export const ZUrl = z.url();

export const ZBooleanString = z.union([
  z.literal('true'),
  z.literal('false'),
]).transform((value) => value === 'true');
