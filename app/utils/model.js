
function $validate(json = this, options = {}) {
    const ModelClass = this.constructor;
    let jsonSchema = ModelClass.jsonSchema;

    if (!jsonSchema || options.skipValidation) {
        return json;
    }

    // No need to call $beforeValidate (and clone the jsonSchema) if $beforeValidate has not been overwritten.
    if (this.$beforeValidate !== ModelBase.prototype.$beforeValidate) {
        jsonSchema = _.cloneDeep(jsonSchema);
        jsonSchema = this.$beforeValidate(jsonSchema, json, options);
    }

    let report = tryValidate(jsonSchema, json, options);
    let validationError = parseValidationError(report);

    if (validationError) {
        throw validationError;
    }

    this.$afterValidate(json, options);
    return json;
}

export default {
    $validate
};