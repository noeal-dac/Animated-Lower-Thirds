const MainSettings = {
  setup() {
    // load theme
    this.activeTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';
		$('head').append('<link rel="stylesheet" href="../common/css/themes/' + activeTheme + '/theme.css"/>');

    // load fonts
    this.customFonts = localStorage.getItem('customFonts') ? JSON.parse(localStorage.getItem('customFonts')) : [];

    // load logos
    this.defaultLogos = localStorage.getItem('defaultLogos') ? JSON.parse(localStorage.getItem('customFonts')) : ['../logos/logo_1.png', '../logos/logo_2.png', '../logos/logo_3.png', '../logos/logo_4.png'];
  },
  mounted() {
    this.defaultLogos.forEach((logoSrc, index) => {
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
  data() {
    return {
      active: false,
      accordionCollapsed: true,
      showMoreCollapsed: true,
      
      animationTime: undefined,
      activeTime: undefined,
      lockActive: false,
      inactiveTime: undefined,
      oneShot: false,

      activeTab: 'appearance',
      
      activeTheme: 'dark',
      themeOptions: ['acri', 'dark', 'rachni'],
      enabledPreview: false,
      hiddenSlotNumbers: false,
      switchesLeft: false,
      enabledTooltips: false,

      customFontFamily: '',
      customFontUrl: '',
      customFonts: [],

      defaultLogos: ['../logos/logo_1.png', '../logos/logo_2.png', '../logos/logo_3.png', '../logos/logo_4.png'],
    }
  },
  methods: {
    changeTheme(event) {
      const newTheme = event.target.value;
      $('link[href="../common/css/themes/' + this.activeTheme + '/theme.css"]').remove();
      const head= document.getElementsByTagName('head')[0];
      const link= document.createElement('link');
      link.rel= "stylesheet";
      link.href= "../common/css/themes/" + newTheme + "/theme.css";
      head.appendChild(link);
      this.activeTheme = newTheme;
    },

    addFont() {
      if (this.customFontFamily && this.customFontUrl) {

        const newFont = {
          name: this.customFontFamily.replace("font-family: ", "").replace(';', ''),
          url: this.customFontUrl.replace("<style> ", "").replace('</style>', '')
        }

        this.customFonts.push(newFont);
        this.sendFont(newFont);

        //Update fonts
        localStorage.setItem("customFonts", JSON.stringify(this.customFonts));

        this.customFontFamily = '';
        this.customFontUrl = '';
      }
    },

    delFont(font) {
      this.customFonts = this.customFonts.filter(item => item.name != font.name);

      localStorage.setItem("customFonts", JSON.stringify(this.customFonts));
    },
    
    sendFont(font) {
      bcf.postMessage({new_font: font.url})
    },

    openLogo(logo) {
      imSel.open(logo);
    },
  }
}