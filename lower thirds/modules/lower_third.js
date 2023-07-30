const LowerThird = {
  template: '#lt-template',
  props: ['index'],
  setup(args) {
    const props = {
      active: ref(false),
      inactive: ref(false),
      switchOn: ref(false),
      previewOn: ref(false),
      enabledPreview: ref(false),
      
      nameClicks: ref(0),
      nameIsEditable: ref(false),

      showStyleSettings: ref(false),

      activeTimeMonitor: ref(0),
      inactiveTimeMonitor: ref(0),

      fonts: {},

      jscolorConfig: ref(JSCOLOR_CONFIG),
    };

    const storables = {
      title: [`alt-${args.index}-title`, `Lower Third ${args.index + 1}`],
      style: [`alt-${args.index}-style`, 1],
      
      align: [`alt-${args.index}-align`, 'left'],
      size: [`alt-${args.index}-size`, 24],
      marginH: [`alt-${args.index}-margin-h`, 4],
      marginV: [`alt-${args.index}-margin-v`, 4],
      inverseRatio: [`alt-${args.index}-inverse-ratio`, 9],
      lineSpacing: [`alt-${args.index}-line-spacing`, 0],
      font: [`alt-${args.index}-font`, 'Open Sans, sans-serif'],
      
      enabledLogo: [`alt-${args.index}-logo`, true],
      logoSize: [`alt-${args.index}-logo-size`, 0],
      isDefaultLogo: [`alt-${args.index}-default-logo`, true],
      logoSrc: [`alt-${args.index}-logo-src`, undefined],
      
      shadows: [`alt-${args.index}-shadows`, false],
      shadowAmount: [`alt-${args.index}-shadow-amount`, 5],

      background: [`alt-${args.index}-background`, true],
      backgroundColor1: [`alt-${args.index}-background-color-1`, '#D54141'],
      backgroundColor2: [`alt-${args.index}-background-color-2`, '#222222'],

      corners: [`alt-${args.index}-corners`, 0],

      borders: [`alt-${args.index}-borders`, false],
      borderThickness: [`alt-${args.index}-borders`, 4],
      bordersColor1: [`alt-${args.index}-borders-color-1`, '#D54141'],
      bordersColor2: [`alt-${args.index}-borders-color-2`, '#222222'],
    };

    // prepare properties
    Object.keys(storables).forEach(key => {
      storables[key] = reactive(new Storable(...storables[key]));
    });

    return {...storables, ...props};
  },
  computed: {
    fonts() {
      const fonts = {};
      if (this.mainSettings) {
        Object.assign(fonts, {'custom': this.mainSettings.customFonts.value.map(val => val.name)});
      }
      Object.assign(fonts, DEFAULT_FONTS);
      return fonts;
    }
  },
  mounted() {
    const initInterval = setInterval(function() {
      if (!this.logoSrc.value) {
        this.logoSrc.loadValue();
      } else {
        clearInterval(initInterval);
      }
    }.bind(this), 10);
    jscolor.install();
  },
  methods: {
    nameClickHandler() {
      if (this.nameClicks == 0) {
        this.nameClicks++;
        setTimeout(function() {
          this.nameClicks = 0;
        }, 500);
      } else {
        this.nameIsEditable = true;
        const inp = this.$el.querySelector('.drag-handle .settings-inputs input');
        setTimeout(() => {
          inp.focus();
        }, 1);
      }
    },
    toggleStyleSettings() {
      this.showStyleSettings = !this.showStyleSettings;
      const styleSettings = this.$el.querySelector(`#style-settings-${this.index}`);

      if (!this.showStyleSettings) {
        styleSettings.style.maxHeight = '0px';
      } else {
        styleSettings.style.maxHeight = styleSettings.scrollHeight + 'px';
      }
    },
    stepUp(value, max) {
      value.value = Math.min(value.value + 1, max);
    },
    stepDown(value, min) {
      value.value = Math.max(value.value - 1, min);
    },
    openLogo() {
      this.$emit('openLogo', {index: this.index, logoSrc: this.logoSrc});
    },
  }
}