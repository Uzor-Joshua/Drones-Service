import * as Joi from 'joi';
import { min } from 'rxjs';

export class DroneDto {
  serial_number: string;
  model: string;
  state: string;
  weight_limit: string;
  drone_id: string;
  battery_capacity: string;
}

export const drone_schema = Joi.object().keys({
  serial_number: Joi.string().max(100).required(),
  model: Joi.string()
    .valid('LIGHTWEIGHT', 'MIDDLEWEIGHT', 'HEAVYWEIGHT', 'CRUISERWEIGHT')
    .required(),
  state: Joi.string().valid(
    'IDLE',
    'LOADING',
    'LOADED',
    'DELIVERING',
    'DELIVERED',
    'RETURNING',
  ),
  weight_limit: Joi.number().max(500).required(),
  battery_capacity: Joi.number().min(0).max(500).required(),
});

export const medication_schema = Joi.object().keys({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9-_]+$/)
    .required(),
  code: Joi.string().required(),
  image: Joi.string().required(),
  weight: Joi.string().required(),
});

export const load_schema = Joi.object().keys({
  drone_serial_number: Joi.string().required(),
  medication_code: Joi.string().required(),
});

export const battery_schema = Joi.object().keys({
  serial_number: Joi.string().required(),
});

export const assign_medication_schema = Joi.object().keys({
  drone_id: Joi.string().required(),
  medication_id: Joi.string().required(),
});
