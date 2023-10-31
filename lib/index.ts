import {ALL_FONTS} from "./font-list.js";
import * as WebFont from 'webfontloader';

const styles = `
.fontable {
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: #1a1a1a;
    color: #eee;
    width: 200px;
    text-align: right;
    padding: 10px 20px;
    font-family: monospace !important;
    z-index: 9999;
}

.fontable select {
    padding: 3px 5px;
    width: 100%;
}

.fontable span {
    cursor: pointer;
    margin-left: 5px;
    font-size: 16px;
}
`;

const defaultOnChange = (fontFamily: string) => {
  document.body.style.fontFamily = fontFamily;
};

const copyToClipboard = (text: string) => {
  void navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([text], {type: 'text/plain'})
    })
  ]);
};

const createLink = (text: string) => {
  const span = document.createElement('span');
  span.innerText = text;
  span.addEventListener('click', () => {
    console.log(span.getAttribute('data-copy'));
    copyToClipboard(span.getAttribute('data-copy'));
  });
  return span;

};

export type FontPickerOptions = {
  onChange?: (fontFamily: string) => void
};

export const initFontPicker = (options: FontPickerOptions = {}) => {
  const instr = document.createElement('div');
  instr.appendChild(createLink('<copy link>'));
  instr.appendChild(createLink('<copy css>'));

  const loadFont = (font: string) => {
    sessionStorage.setItem('font', font);
    if (font) {
      WebFont.load({
        google: {
          families: [font]
        },
        active: () => {
          options.onChange ? options.onChange(font) : defaultOnChange(font);
          instr.children.item(0).setAttribute('data-copy', `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${font}"/>`);
          instr.children.item(1).setAttribute('data-copy', `font-family: '${font}, sans-serif'`);
        }
      });
    } else {
      document.body.style.fontFamily = 'sans-serif';
    }
  };

  const initialFont = sessionStorage.getItem('font');
  if (initialFont) {
    loadFont(initialFont);
  }

  const containerDiv = document.createElement('div');
  const shadow = containerDiv.attachShadow({mode: 'closed'});
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(styles);
  shadow.adoptedStyleSheets = [stylesheet];
  const fontableEl = document.createElement('div');
  fontableEl.classList.add('fontable');
  const select = document.createElement('select');
  select.innerHTML = '<option value="">--Select Font--</option>' + ALL_FONTS.map((font: string) => {
    if (font === initialFont) {
      return `<option selected>${font}</option>`;
    } else {
      return `<option>${font}</option>`;
    }
  }).join('');
  select.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    loadFont(target.value);
  });
  fontableEl.appendChild(select);
  fontableEl.appendChild(instr);
  shadow.appendChild(fontableEl);
  document.body.appendChild(containerDiv);
  select.focus();
};




