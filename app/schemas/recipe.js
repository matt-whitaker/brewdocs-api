import joi from "joi";

const schema = joi.object().required().keys({
    id: joi.number().optional(),
    slug: joi.string().lowercase().optional()
        .when(joi.ref('id'), { is: joi.exist(), then: joi.required() }),
    name: joi.string().required(),
    description: joi.string().optional().default(null)
});

export default { schema };