class Storable {
  _value;

  constructor(id, defaultValue) {
    this.id = id;
    this.defaultValue = defaultValue;
    this.loadValue();
  }

  loadValue() {
    const item = JSON.parse(localStorage.getItem(this.id));
    if (!item) {
      this.value = this.defaultValue;
    } else {
      this.value = item;
    }
  }

  update() {
    this.value = this._value;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;

    if (newValue !== undefined) {
      newValue = JSON.stringify(newValue);
      localStorage.setItem(this.id, newValue);
    }
  }
}

class Readable {
  value;

  constructor(id) {
    this.id = id;
    this.update();
  }

  update() {
    this.value = JSON.parse(localStorage.getItem(this.id));
  }
}

function parseBool(val) {
  return val == "true" ? true : false;
}
function parseStr(val) {
  return val;
}


function migrate(config) {

  const map = {
    // globals
    'global-animation-time': ['alt2-animation-time', parseInt],
    'global-active-time': ['alt2-active-time', parseInt],
    'global-inactive-time': ['alt2-inactive-time', parseInt],
    'global-lock-active': ['alt2-lock-active', parseBool],
    'global-oneshot': ['alt2-one-shot', parseBool],
    'set-preview': ['alt2-enabled-preview', parseBool],
    'set-slot-numbers': ['alt2-hidden-slot-numbers', parseInt],
    'set-switch-position': ['alt2-switches-left', parseInt],
    'set-tooltips': ['alt2-enabled-tooltips', parseInt],
    'theme': ['alt2-theme', parseStr],

    // specific
    'alt-1-name': ['-name', parseStr],
    'alt-1-info': ['-info', parseStr],
    'alt-1-logo': ['-logo', parseStr],
    'alt-1-logo-preview': ['-logo-src', parseStr],
    'alt-1-style': ['-style', parseInt],
    'alt-1-size': ['-size', parseInt],
    'alt-1-margin-h': ['-margin-h', parseInt],
    'alt-1-margin-v': ['-margin-v', parseInt],
    'alt-1-inverse-ratio': ['-inverse-ratio', parseInt],
    'alt-1-line-spacing': ['-line-spacing', parseInt],
    'alt-1-font': ['-font', parseStr],
    'alt-1-logo-size': ['-logo-size', parseInt],
    'alt-1-shadows': ['-shadows', parseBool],
    'alt-1-shadow-amount': ['-shadow-amount', parseInt],
    'alt-1-background': ['-background', parseBool],
    'alt-1-style-color-1': ['-background-color-1', parseStr],
    'alt-1-style-color-2': ['-background-color-1', parseStr],
    'alt-1-style-color-3': ['-borders-color-1', parseStr],
    'alt-1-style-color-4': ['-borders-color-2', parseStr],
    'alt-1-border-color': ['-borders', parseBool],
    'alt-1-border-thickness-amount': ['-margin-h', parseInt],
    'alt-1-corners': ['-corners', parseInt],
    'alt-1-name-transform': ['-name-transform', parseBool],
    'alt-1-name-weight': ['-name-bold', parseBool],
    'alt-1-name-style': ['-name-italic', parseBool],
    'alt-1-name-color': ['-name-color', parseStr],
    'alt-1-info-transform': ['-info-transform', parseBool],
    'alt-1-info-weight': ['-info-bold', parseBool],
    'alt-1-info-style': ['-info-italic', parseBool],
    'alt-1-info-color': ['-info-color', parseStr],
    'alt-1-animation-time': ['-animation-time', parseInt],
    'alt-1-active-time': ['-active-time', parseInt],
    'alt-1-inactive-time': ['-inactive-time', parseInt],
    'alt-1-oneshot': ['-one-shot', parseBool],
    'alt-1-autotrigger': ['-auto-trigger', parseBool],
    'alt-1-autoload': ['-auto-load', parseBool],
  };

  const newValues = {};

  Object.entries(config).forEach(([key, val]) => {
    let newKey;
    let parser;
    let parsed;

    // globals
    if (!!map[key] && !key.startsWith('alt-')) {
      newKey = map[key][0];
      parser = map[key][1];

      parsed = parser(val);

      if (!!parsed) {
        newValues[newKey] = parsed;
      } else {
        console.log(newKey, val, parsed)
      }
    
    // lt specific
    } else if (key.startsWith('alt-')) {
      const ltId = parseInt(key.substring(4, 5));

      key = 'alt-1' + key.substring(5);

      if (!!map[key]) {
        newKey = `alt2-${ltId - 1}${map[key][0]}`;
        parser = map[key][1];
  
        parsed = parser(val);
  
        if (!!parsed) {
          newValues[newKey] = parsed;
        } else {
          console.log(newKey, val, parsed); 
        }
      }
    }
  });

  // parse Fonts manually
  newValues['alt2-custom-fonts'] = Object.entries(config)
                                        .filter(([key, val]) => key.startsWith('font-name-'))
                                        .map(key => parseInt(key.replace(/[^\d]+(\d+)/, '$1')))
                                        .map(id => {
                                          return {
                                            name: config['font-name-added-' + id],
                                            url: config['font-url-added-' + id],
                                          }
                                        });
  
  // parse Logos manually
  newValues['alt2-default-logos'] = [
    config['alt-1-logo-default'],
    config['alt-2-logo-default'],
    config['alt-3-logo-default'],
    config['alt-4-logo-default'],
    '../logos/logo.png',
    '../logos/logo.png',
    '../logos/logo.png',
    '../logos/logo.png',
    '../logos/logo.png',
    '../logos/logo.png',
  ];

  
  // align manually
  newValues['alt2-0-align'] = 'alt-1-align-left' == "true" ? 'left' : 'alt-1-align-center' == "true" ? 'center' : 'right';
  newValues['alt2-0-align'] = 'alt-2-align-left' == "true" ? 'left' : 'alt-2-align-center' == "true" ? 'center' : 'right';
  newValues['alt2-0-align'] = 'alt-3-align-left' == "true" ? 'left' : 'alt-3-align-center' == "true" ? 'center' : 'right';
  newValues['alt2-0-align'] = 'alt-4-align-left' == "true" ? 'left' : 'alt-4-align-center' == "true" ? 'center' : 'right';

  // slots manually
  // names
  Array.from({length: 10}, () => '').forEach((v, lt) => {
    newValues[`alt2-${lt}-slot-names`] = Array.from({length: 10}, () => '').map((v, i) => {
      if (config[`alt-${lt + 1}-name-${i + 1}`]) {
        return config[`alt-${lt + 1}-name-${i + 1}`];
      }
      return '';
    });
  });

  // infos
  Array.from({length: 10}, () => '').forEach((v, lt) => {
    newValues[`alt2-${lt}-slot-infos`] = Array.from({length: 10}, () => '').map((v, i) => {
      if (config[`alt-${lt + 1}-info-${i + 1}`]) {
        return config[`alt-${lt + 1}-info-${i + 1}`];
      }
      return '';
    });
  });

  // logos
  Array.from({length: 10}, () => '').forEach((v, lt) => {
    newValues[`alt2-${lt}-slot-logos`] = Array.from({length: 10}, () => '').map((v, i) => {
      if (config[`alt-${lt + 1}-logo-${i + 1}`]) {
        return config[`alt-${lt + 1}-logo-${i + 1}`];
      }
      return '';
    });
  });

  return newValues;
}