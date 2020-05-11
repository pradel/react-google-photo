const path = require('path');

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.merge((current) => {
    if (!current.resolve.alias) {
      current.resolve.alias = {};
    }
    current.resolve.alias['react-google-photo'] = path.join(__dirname, '../');
    return current;
  });
};
