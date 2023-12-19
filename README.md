# Fontable &nbsp;&nbsp;&nbsp;[![NPM Version](https://flat.badgen.net/npm/v/fontable)](https://www.npmjs.com/package/fontable)&nbsp;&nbsp;[![Demo](https://flat.badgen.net/badge/icon/demo/cyan?label)](https://randombits-dev.github.io/fontable/)

## Try out different Google fonts by embedding a font picker on your website.

![fontable](https://github.com/randombits-dev/fontable/assets/4440760/33f4dff9-3448-4225-b257-12fa5335cb8a)

### Features

1. Embed a temporary font picker on your site. It shows up in the lower right corner of the page.
2. Choose from over 1000 open source fonts, loaded from Google fonts.
3. When you find a font you like, copy the CSS to install it permanently on your site, and remove the font picker.

### Setup

Add the following script to your html page:

```html
<script src="https://cdn.jsdelivr.net/npm/fontable@latest/dist/auto.js"></script>
```

### Usage

Filter the fonts by type (optional), and then choose a font family. The font will be applied to the body element of your site.

If you have font families applied to elements lower than the body element, it will not override those fonts unless you enable the **Override** toggle.

Tip: When the font selection box is focused, you can use up/down arrows to cycle through fonts quickly.

### Enabled checkbox

This toggle turns the font picker on/off. When it is off, the font is not applied to the page.

### Override checkbox

This toggle will override all **font-family** styles on your site with the selected font.

### Font CSS Output

Use **copy link** to copy the stylesheet link to your clipboard. Paste it into your html **head** element.

Use **copy CSS** to copy the CSS to your clipboard. Paste it into your CSS file.

Use **google fonts** to open the Google fonts page for the selected font.

### Other

A full guide to using Google fonts: https://developers.google.com/fonts/docs/getting_started

Brought to you by [Random Bits Software Engineering](https://randombits.dev)
