'use strict';
var schemas = [
	{
		'label': '/soajs/Errors',
		'schema': {
			"type": "object",
			"patternProperties": {
				'^[1-9][0-9]{0,2}$': {
					"type": "string"
				}
			},
			"additionalProperties": false
		}
	},
	{
		'label': '/soajs/Field',
		'schema': {
			"type": "object",
			"properties": {
				"source": {'type': 'array', 'minItems': 1, 'items': {'type': 'string'}},
				"default": {"type": ["string", "number", "boolean", "array", "object"]},
				"required": {"type": "boolean"},
				"validation": {"type": "object"}
			},
			"additionalProperties": false
		}
	},
	{
		'label': '/soajs/input',
		'schema': {
			"type": "object",
			"properties": {
				"commonFields": {
					"type": "array",
					"items": {
						"type": "string",
						"pattern": "^[_a-z][_a-zA-Z0-9]*$"
					},
					"uniqueItems": true,
					"minItems": 1
				},
				"_apiInfo": {
					"type": "object",
					"properties": {
						"l": {"type": "string", required: true},
						"group": {"type": "string", required: false},
						"groupMain": {"type": "boolean", required: false}
					}
				}
			},
			"patternProperties": {
				"^(?!commonFields|_apiInfo)[_a-z][_a-zA-Z0-9]*$": {"$ref": "/soajs/Field"}
			},
			"additionalProperties": false
		}
	},
	{
		'label': '/soajs/CommonFields/input',
		'schema': {
			"type": "object",
			"patternProperties": {
				"^(?!commonFields)[_a-z][_a-zA-Z0-9]*$": {"$ref": "/soajs/Field"}
			},
			"additionalProperties": false
		}
	},
	{
		'label': '/soajs',
		'schema': {
			"type": "object",
			"properties": {
				"extKeyRequired": {"type": "boolean", "required": false},
				"designatedPort": {"type": "integer", "required": false},
				"errors": {"$ref": "/soajs/Errors"},
				"schema": {
					"properties": {
						"commonFields": {"$ref": "/soajs/CommonFields/input"}
					},
					"patternProperties": {
						'^(?!commonFields)[_a-z\/][_a-zA-Z0-9\/:]*$': {"$ref": "/soajs/input"}
					},
					"additionalProperties": false
				}
			}
		}
	}
];

module.exports = function(validator) {
	var v = new validator.Validator();
	schemas.forEach(function(oneSchema) {
		v.addSchema(oneSchema.schema, oneSchema.label);
	});
	return v;
};
