import {ALL_FONTS} from "./font-list.js";
import * as WebFont from 'webfontloader';
import './styles.css';


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
  };

  const initialFont = sessionStorage.getItem('font');
  if (initialFont) {
    loadFont(initialFont);
  }

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('fontable');
  const select = document.createElement('select');
  select.innerHTML = ALL_FONTS.map((font: string) => {
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
  containerDiv.appendChild(select);
  containerDiv.appendChild(instr);
  document.body.appendChild(containerDiv);
  select.focus();
};




