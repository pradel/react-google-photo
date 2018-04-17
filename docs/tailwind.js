const _ = require('lodash');
const defaultConfig = require('tailwindcss/defaultConfig')();

const colors = _.pick(defaultConfig.colors, [
  'black',
  'grey-darkest',
  'grey-darker',
  'grey-dark',
  'grey',
  'grey-light',
  'grey-lighter',
  'grey-lightest',
  'white',
  'teal-darkest',
  'teal-darker',
  'teal-dark',
  'teal',
  'teal-light',
  'teal-lighter',
  'teal-lightest',
]);

const config = {
  ...defaultConfig,
  colors: colors,
  textColors: colors,
  backgroundColors: colors,
  borderColors: global.Object.assign({ default: colors['grey-light'] }, colors),
  screens: _.pick(defaultConfig.screens, ['sm', 'md', 'lg']),
};

// console.log(config);

module.exports = config;
