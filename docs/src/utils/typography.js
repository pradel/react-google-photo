import Typography from 'typography';
import sutroTheme from 'typography-theme-sutro';
import CodePlugin from 'typography-plugin-code';

sutroTheme.googleFonts[0] = { ...sutroTheme.googleFonts[1], name: 'Rubik' };
sutroTheme.headerFontFamily[0] = 'Rubik';

sutroTheme.googleFonts[1] = {
  styles: ['400', '400i', '700', '700i'],
  name: 'Lato',
};
sutroTheme.bodyFontFamily[0] = 'Lato';

sutroTheme.plugins = [new CodePlugin()];

const typography = new Typography(sutroTheme);

export default typography;
