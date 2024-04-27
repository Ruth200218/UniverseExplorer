'use client';

import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
const log = (type) => console.log.bind(console, type);

// generate schema from json file

// read json file and convert to schema

function convertJsonToSchema(json) {
	let schema = {
		title: 'Solar System',
		type: 'object',
		properties: {},
	};

	for (let key in json) {
		let value = json[key];
		let type = typeof value;

		if (Array.isArray(value)) {
			type = 'array';
			value = [value[0]];
		}
		let property = {
			type: type,
			title: key,
			default: value,
		};

		if (key === 'texture') {
			property.format = 'data-url';
		}

		if (type === 'object') {
			property.properties = convertJsonToSchema(value);
		} else if (type === 'array') {
			property.items = convertJsonToSchema(value[0]);
		} else {
			property.default = value;
		}

		schema.properties[key] = property;
	}

	return schema;
}

export default function page({ schema, handleChange }) {
	return <Form
		schema={convertJsonToSchema({ ...schema })}
		onChange={handleChange}
		validator={validator}
		formData={{ ...schema }}
		onSubmit={log('submitted')}
		onError={log('errors')}
	/>;
}
