const fs = require('fs');
const path = require('path');

const defaultBreakpoints = {
  mobileSmall: 320,
  mobileMedium: 375,
  mobileLarge: 425,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  desktopLarge: 1920,
};

const generateSassFile = (breakpoints) => {
  const sassContent = `// AUTO-GENERATED FILE - DO NOT EDIT
// This file is generated automatically from your theme configuration

@use 'sass:map';

$breakpoints: (
  ${Object.entries(breakpoints)
    .map(([key, value]) => `'${key}': ${value}px`)
    .join(',\n  ')}
);

@mixin media($breakpoint) {
  $width: map.get($breakpoints, $breakpoint);
  @if $width != null {
    @media (max-width: $width) {
      @content;
    }
  } @else {
    @warn "Breakpoints not found";
  }
}
`;

  fs.writeFileSync(path.join(__dirname, '../src/style/media.scss'), sassContent);
  fs.writeFileSync(
    path.join(__dirname, '../src/shared/theme/defaultBreakpoints.js'),
    JSON.stringify(defaultBreakpoints),
  );
};

generateSassFile(defaultBreakpoints);
console.log('✅ Breakpoints Sass file generated!');
