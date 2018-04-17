let defaultConfig = require('tailwindcss/defaultConfig')();

module.exports = {
  ...defaultConfig,
  screens: {
    ...defaultConfig.screens,
    xl: '992px',
  },
};
