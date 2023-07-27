const MainSettings = {
  setup() {
    const props = {
      accordionCollapsed: ref(true),
      showMoreCollapsed: ref(true),

      activeTab: ref('appearance'),

      customFontFamily: ref(''),
      customFontUrl: ref(''),

      themeOptions: ref(THEME_OPTIONS)
    }

    let storables = {
      active: ['alt-master-switch', false],
      activeTheme: ['alt-theme', 'dark'],
      customFonts: ['alt-custom-fonts', []],
      defaultLogos: ['alt-default-logos', DEFAULT_LOGOS],
      
      animationTime: ['alt-animation-time', 4],
      
      activeTime: ['alt-active-time', 25],
      lockActive: ['alt-lock-active', false],

      inactiveTime: ['alt-inactive-time', 420],
      oneShot: ['alt-one-shot', false],

      enabledPreview: ['alt-enabled-preview', false],
      hiddenSlotNumbers: ['alt-hidden-slot-numbers', false],
      switchesLeft: ['alt-switches-left', false],
      enabledTooltips: ['alt-enabled-tooltips', true],
    }

    Object.keys(storables).forEach(key => {
      storables[key] = reactive(new Storable(...storables[key]));
    });

    $('head').append('<link rel="stylesheet" href="../common/css/themes/' + storables.activeTheme.value + '/theme.css"/>');

    return {...storables, ...props};
  },
  mounted() {
    this.defaultLogos.value.forEach((logoSrc, index) => {
      const previews = [...document.querySelectorAll(`#alt-${index + 1}-logo-preview`)];
      previews.forEach(elem => {
        elem.src = logoSrc;
      });
      const defaults = [...document.querySelectorAll(`#alt-${index + 1}-logo-default`)];
      defaults.forEach(elem => {
        elem.src = logoSrc;
      });
    });
  },
  methods: {
    changeTheme(event) {
      const newTheme = event.target.value;
      $('link[href="../common/css/themes/' + this.activeTheme.value + '/theme.css"]').remove();
      const head= document.getElementsByTagName('head')[0];
      const link= document.createElement('link');
      link.rel= "stylesheet";
      link.href= "../common/css/themes/" + newTheme + "/theme.css";
      head.appendChild(link);
      this.activeTheme.value = newTheme;
    },

    addFont() {
      if (this.customFontFamily && this.customFontUrl) {

        const newFont = {
          name: this.customFontFamily.replace("font-family: ", "").replace(';', ''),
          url: this.customFontUrl.replace("<style> ", "").replace('</style>', '')
        }

        this.customFonts.value = [...this.customFonts.value, newFont];
        this.sendFont(newFont);

        this.customFontFamily = '';
        this.customFontUrl = '';
      }
    },

    delFont(font) {
      this.customFonts.value = this.customFonts.value.filter(item => item.name != font.name);
    },
    
    sendFont(font) {
      bcf.postMessage({new_font: font.url})
    },

    openLogo(logo) {
      imSel.open(logo);
    },
  }
}