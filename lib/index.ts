import * as WebFont from 'webfontloader';
import {TEMPLATE} from "./template.ts";
import {getFontCSS, getFontLink, getFontOptions, getFontStyle, getGoogleLink, getGroupOptions} from "./utils.ts";

export type FontPickerOptions = {
  onChange?: (fontFamily: string) => void
};

export const initFontPicker = (options: FontPickerOptions = {}) => {
  const settings = JSON.parse(sessionStorage.getItem('fontable')) || {enabled: true, override: false};
  const updateSetting = (key: string, value: any) => {
    settings[key] = value;
    sessionStorage.setItem('fontable', JSON.stringify(settings));
  };

  const style = document.createElement('style');
  style.setAttribute('id', 'fontable-styles');
  const defaultOnChange = (fontFamily: string) => {
    style.textContent = getFontStyle(fontFamily, settings.override);
  };

  const rootEl = document.createElement('div');
  rootEl.classList.add('fontable');
  rootEl.innerHTML = TEMPLATE;

  const instr1 = rootEl.querySelector("#instr1") as HTMLDivElement;
  const instr2 = rootEl.querySelector("#instr2") as HTMLDivElement;
  const instr1Icon = instr1.firstChild as HTMLElement;
  const instr2Icon = instr2.firstChild as HTMLElement;
  const googleLink = rootEl.querySelector("#google-link") as HTMLAnchorElement;
  instr1.addEventListener('click', () => {
    navigator.clipboard.writeText(getFontLink(settings.font));
    instr1Icon.style.visibility = 'visible';
    setTimeout(() => {
      instr1Icon.style.visibility = 'hidden';
    }, 1000);
  });
  instr2.addEventListener('click', () => {
    navigator.clipboard.writeText(getFontCSS(settings.font));
    instr2Icon.style.visibility = 'visible';
    setTimeout(() => {
      instr2Icon.style.visibility = 'hidden';
    }, 1000);
  });
  googleLink.addEventListener('click', () => {
    // navigate to new tab
    window.open(getGoogleLink(settings.font), '_blank');
  });

  const toggle = rootEl.querySelector("#toggle") as HTMLInputElement;
  toggle.checked = settings.enabled ?? true;
  toggle.addEventListener("change", () => {
    updateSetting('enabled', toggle.checked);
    rootEl.classList.toggle('enabled', toggle.checked);
    if (toggle.checked) {
      loadFont(settings.font);
    } else {
      document.querySelector('#fontable-styles').remove();
      options.onChange && options.onChange('');
    }
  });

  const override = rootEl.querySelector("#override") as HTMLInputElement;
  override.checked = settings.override ?? true;
  override.addEventListener("change", () => {
    updateSetting('override', override.checked);
    if (settings.enabled) {
      loadFont(settings.font);
    }
  });

  const loadFont = (font: string) => {
    updateSetting('font', font);
    if (font && settings.enabled) {
      WebFont.load({
        google: {
          families: [font]
        },
        active: () => {
          options.onChange ? options.onChange(font) : defaultOnChange(font);
          googleLink.style.visibility = 'visible';
          instr1.style.visibility = 'visible';
          instr2.style.visibility = 'visible';
        }
      });
      if (!document.querySelector('#fontable-styles')) {
        document.head.appendChild(style);
      }
    } else {
      options.onChange && options.onChange('');
      style.textContent = '';
      googleLink.style.visibility = 'hidden';
      instr1.style.visibility = 'hidden';
      instr2.style.visibility = 'hidden';
    }
  };

  if (settings.enabled) {
    loadFont(settings.font);
    rootEl.classList.toggle('enabled');
  }

  const writeSelect = (selectedGroup: string) => {
    select.innerHTML = getFontOptions(selectedGroup, settings.font).join('');
    if (!select.querySelector('option[selected]')) {
      loadFont('');
    }
  };

  const groupSelect = rootEl.querySelector("#group-select") as HTMLSelectElement;
  groupSelect.innerHTML = getGroupOptions(settings.group).join('');
  groupSelect.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    const selectedGroup = target.value;
    updateSetting('group', selectedGroup);
    writeSelect(selectedGroup);
  });

  const select = rootEl.querySelector("#font-select") as HTMLSelectElement;
  writeSelect(settings.group);
  select.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    loadFont(target.value);
  });


  const containerEl = document.createElement('div');
  const shadow = containerEl.attachShadow({mode: 'open'});
  shadow.appendChild(rootEl);
  document.body.appendChild(containerEl);
  select.focus();
};




