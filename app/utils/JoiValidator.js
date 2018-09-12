import { Validator } from 'objection';

class JoiValidator extends Validator {
    validate(args) {
        const { model, json } = args;
        const { value, error } = model.constructor.schema.validate(json);

        if (error) {
            throw error;
        }

        return value;
    }
}

export default {
    JoiValidator
};