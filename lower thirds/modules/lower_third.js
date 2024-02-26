const LowerThird = {
  template: '#lt-template',
  props: ['index', 'fonts'],
  setup(args) {
    const props = {
      active: ref(false),
      inactive: ref(false),
      switchOn: ref(false),
      previewOn: ref(false),
      
      enabledPreview: ref(false),
      switchLeft: ref(false),
      hiddenSlotNumbers: ref(false),
      defaultLogoSrc: ref('../logos/logo.png'),
      
      nameClicks: ref(0),
      nameIsEditable: ref(false),

      showStyleSettings: ref(false),

      activeTimeMonitor: ref(0),
      inactiveTimeMonitor: ref(0),

      slotTimeout: ref(),
      slotIsDelete: ref(Array.from({length: 10}, () => false)),

      jscolorConfig: ref(JSCOLOR_CONFIG),
      storables: [],
    };

    const storables = {
      title: [`alt2-${args.index}-title`, `Lower Third ${args.index + 1}`],
      style: [`alt2-${args.index}-style`, 1],
      autoTrigger: [`alt2-${args.index}-auto-trigger`, false],
      autoLoad: [`alt2-${args.index}-auto-load`, false],
      slotIndex: [`alt2-${args.index}-slot-index`, -1],
      
      customTimeSettings: [`alt2-${args.index}-custom-time-settings`, false],
      animationTime: [`alt2-${args.index}-animation-time`, ''],
      activeTime: [`alt2-${args.index}-active-time`, ''],
      lockActive: [`alt2-${args.index}-lock-active`, false],
      inactiveTime: [`alt2-${args.index}-inactive-time`, ''],
      oneShot: [`alt2-${args.index}-one-shot`, false],
      
      align: [`alt2-${args.index}-align`, 'left'],
      size: [`alt2-${args.index}-size`, 24],
      marginH: [`alt2-${args.index}-margin-h`, 4],
      marginV: [`alt2-${args.index}-margin-v`, 4],
      inverseRatio: [`alt2-${args.index}-inverse-ratio`, 9],
      lineSpacing: [`alt2-${args.index}-line-spacing`, 0],
      font: [`alt2-${args.index}-font`, 'Open Sans, sans-serif'],
      
      enabledLogo: [`alt2-${args.index}-logo`, true],
      logoSize: [`alt2-${args.index}-logo-size`, 0],
      logoSrc: [`alt2-${args.index}-logo-src`, undefined],
      
      shadows: [`alt2-${args.index}-shadows`, false],
      shadowAmount: [`alt2-${args.index}-shadow-amount`, 5],

      background: [`alt2-${args.index}-background`, true],
      backgroundColor1: [`alt2-${args.index}-background-color-1`, '#D54141'],
      backgroundColor2: [`alt2-${args.index}-background-color-2`, '#222222'],

      corners: [`alt2-${args.index}-corners`, 0],

      borders: [`alt2-${args.index}-borders`, false],
      borderThickness: [`alt2-${args.index}-border-thickness`, 4],
      bordersColor1: [`alt2-${args.index}-borders-color-1`, '#D54141'],
      bordersColor2: [`alt2-${args.index}-borders-color-2`, '#222222'],

      name: [`alt2-${args.index}-name`, ''],
      nameTransform: [`alt2-${args.index}-name-transform`, true],  // uppercase | normal
      nameBold: [`alt2-${args.index}-name-bold`, true],            // lighter | bold
      nameItalic: [`alt2-${args.index}-name-italic`, false],       // normal | italic
      nameColor: [`alt2-${args.index}-name-color`, '#F2F2F2'],

      info: [`alt2-${args.index}-info`, ''],
      infoTransform: [`alt2-${args.index}-info-transform`, true],
      infoBold: [`alt2-${args.index}-info-bold`, true],
      infoItalic: [`alt2-${args.index}-info-italic`, false],
      infoColor: [`alt2-${args.index}-info-color`, '#8A8A8A'],

      slotNames: [`alt2-${args.index}-slot-names`, Array.from({length: 10}, () => '')],
      slotInfos: [`alt2-${args.index}-slot-infos`, Array.from({length: 10}, () => '')],
      slotLogos: [`alt2-${args.index}-slot-logos`, Array.from({length: 10}, () => '')],
    };

    // prepare properties
    Object.keys(storables).forEach(key => {
      storables[key] = reactive(new Storable(...storables[key]));
      props.storables.push(key);
    });

    return {...storables, ...props};
  },
  computed: {
    slotTooltips() {
      return Object.values(this.slotNames.value)
                   .map((name, index) => name !== '' || this.slotInfos.value[index] !== '')
                   .map((isStored, index) => {
                      if (isStored) {
                        return `<p>${this.slotNames.value[index]}<br>${this.slotInfos.value[index]}<hr><p>Click and hold to delete.</p>`;
                      } else {
                        return '<p>Empty. Click to save.</p>';
                      }
                   });
    },
    isDefaultLogo() {
      return !this.logoSrc.value || this.logoSrc.value == this.defaultLogoSrc;
    },
    resolvedLogoSrc() {
      return this.isDefaultLogo ? this.defaultLogoSrc : this.logoSrc.value;
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

    //expand timeSettings if customTimeSettings = true;
    const timeSettings = this.$el.querySelector(`#time-settings-${this.index}`);
    if (!this.customTimeSettings.value) {
      timeSettings.style.maxHeight = '0px';
    } else {
      timeSettings.style.maxHeight = timeSettings.scrollHeight + 'px';
    }

    // this.storables.forEach(key => watch(this[key], () => {}));

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
    toggleTimeSettings() {
      this.customTimeSettings.value = !this.customTimeSettings.value;
      const timeSettings = this.$el.querySelector(`#time-settings-${this.index}`);

      if (!this.customTimeSettings.value) {
        timeSettings.style.maxHeight = '0px';
      } else {
        timeSettings.style.maxHeight = timeSettings.scrollHeight + 'px';
      }
    },
    stepUp(value, max) {
      value.value = Math.min(value.value + 1, max);
      this.$emit('styleChanged');
    },
    stepDown(value, min) {
      value.value = Math.max(value.value - 1, min);
      this.$emit('styleChanged');
    },
    restrictStyles() {
      if (this.style.value == 1 && this.align.value == 'center') {
        this.align.value = 'left';
        this.$emit('styleChanged');
      }
    },
    openLogo() {
      this.$emit('openLogo', {index: this.index, logoSrc: this.logoSrc});
    },
    clearInputs() {
      this.name.value = '';
      this.info.value = '';
      this.logoSrc.value = this.defaultLogoSrc;
      this.$emit('resetLogo');
    },
    slotHandlerDown(index) {
      clearTimeout(this.slotTimeout);
      this.slotTimeout = setTimeout(() => {
        if (this.slotIsStored(index)){
          this.slotIsDelete[index] = true;
        }
      }, 600);
    },
    slotHandlerUp(index) {
      clearTimeout(this.slotTimeout);
      // store Slot
      if (!this.slotIsDelete[index] && !this.slotIsStored(index)) {
        this.storeSlot(index);
      // load Slot
      } else if (!this.slotIsDelete[index]) {
        this.loadSlot(index);

      // delete Slot
      } else {
        this.deleteSlot(index);
      }
      this.slotNames.update();
      this.slotInfos.update();
      this.slotLogos.update();
    },
    slotIsStored(index) {
      return this.slotNames.value[index] !== '' || this.slotInfos.value[index] !== '';
    },
    storeSlot(index) {
      this.slotNames.value[index] = this.name.value;
      this.slotInfos.value[index] = this.info.value;
      this.slotLogos.value[index] = this.isDefaultLogo ? '' : this.logoSrc.value;
      this.slotIndex.value = index;
    },
    loadSlot(index) {
      this.slotIndex.value = index;
      this.name.value = this.slotNames.value[index];
      this.info.name = this.slotInfos.value[index];
      this.isDefaultLogo.value = this.slotLogos.value[index] == '';

      if (!this.isDefaultLogo.value) {
        this.logoSrc.value = this.slotLogos.value[index];
      } else {
        this.$emit('resetLogo');
      }
      
      if (this.autoTrigger.value) {
        this.switchOn = true;
        this.$emit('switchChanged');
      }

      if (this.autoLoad.value) {
        this.$emit('slotChanged');
      }
    },
    deleteSlot(index) {
      this.slotNames.value[index] = '';
      this.slotInfos.value[index] = '';
      this.slotLogos.value[index] = '';
      this.slotIsDelete[index] = false;
      if (this.slotIndex.value == index) {
        this.slotIndex.value = -1;
      }
    },
    slotLoadNext() {
      // if no slot was loaded and no slot is stored => do nothing
      // if no slot was loaded and no slot is active => load first stored
      // if no slot was loaded => assume that first active slot is current slot and load next
      
      const storedSlots = Array.from({length: 10}, (v, i) => this.slotIsStored(i));

      // if slotIndex is -1 search for first active or stored if no active is found
      if (this.slotIndex.value == -1) {
        const firstActive = Array.from({length: 10}, (v, i) => this.slotIsActive(i)).indexOf(true);
        const firstStored = storedSlots.indexOf(true);
        
        if (firstActive < 0 && firstStored < 0) {
          return;
        } else {
          this.loadSlot(storedSlots.indexOf(true, firstActive + 1));
        }
      } else {
        let nextSlot = storedSlots.indexOf(true, this.slotIndex.value + 1);

        if (nextSlot < 0) {
          // is >= 0 because a slot is loaded :)
          nextSlot = storedSlots.indexOf(true);
        }
        this.loadSlot(nextSlot);
      }
    }
  }
}