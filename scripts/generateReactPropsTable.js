// https://github.com/TeamWertarbyte/react-props-md-table/blob/master/index.js
const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(1);
const filename = args[args.length - 1];
const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

let markdown = '';
const component = reactDocs.parse(content);

markdown += `### ${component.displayName} Props \n\n`;

// console.log(component.props.transitionStyles);

const props = Object.entries(component.props).map(
  ([name, { type, required, description, defaultValue }]) => {
    return {
      name: `${name}${required ? '*' : ''}`,
      defaultValue: formatDefaultValue(type, defaultValue),
      type: `\`${formatType(type)}\``,
      description,
      required,
    };
  }
);

// Header part
const headers = ['Name', 'Type', 'Default', 'Description'];
markdown += `|${headers.join('|')}|\n`;
markdown += `|${headers.map(() => '---').join('|')}|\n`;

// Props part
for (const { name, defaultValue, type, description } of props) {
  markdown += `|${name}|${type}|${defaultValue}|${description}|\n`;
}

// Write the file
fs.writeFileSync('toto.md', markdown);

function formatType(type) {
  if (type.name === 'union') {
    return type.value.map(formatType).join('|');
  }
  if (type.name === 'arrayOf') {
    return `${type.name}[${type.value.raw}]`;
  } else {
    return type.name;
  }
}

function formatDefaultValue(type, defaultValue) {
  if (type.name === 'object') {
    return '';
  } else if (defaultValue) {
    return `\`${defaultValue.value}\``;
  } else {
    return '';
  }
}
