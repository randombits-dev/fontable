# Fontable

## Find the right Google font by embedding a font picker on your website.

### Features

1. Embed a temporary font picker on your site. It shows up in the lower right corner of the page.
2. Choose from over 1000 open source fonts, loaded from Google fonts.
3. When you find a font you like, copy the CSS to install it permanently on your site, and remove the font picker.

### Tips

1. The font picker is focused on page load. You can use arrow keys to try out fonts quickly.
2. A full guide to using Google fonts: https://developers.google.com/fonts/docs/getting_started

### Quick Install

Add the following script to your html page:

```html
<script src="https://cdn.jsdelivr.net/npm/fontable@latest/dist/auto.js"></script>
```

### Advanced Install

Use this method if you want to customize how the font family is applied on your site. By default, it is applied to the body element.

Install:
```
npm install fontable
```

Initialize:
```js
import {initFontPicker} from "fontable";

initFontPicker({
  onChange: (fontFamily) => {
    // set the font family style manually
    document.querySelector('#content').style.fontFamily = fontFamily;
  }
});
```

### About

Brought to you by [Random Bits Software Engineering](https://randombits.dev)
