const LowerThird = {
  template: '#lt-template',
  props: ['mainsettings', 'index'],

  setup(args) {
    const props = {
      active: ref(false),
      inactive: ref(false),
      switchOn: ref(false),
      previewOn: ref(false),
      
      nameClicks: ref(0),
      nameIsEditable: ref(false),

      showStyleSettings: ref(false),

      activeTimeMonitor: ref(0),
      inactiveTimeMonitor: ref(0),
    };

    const storables = {
      title: [`alt-${args.index}-title`, `Lower Third ${args.index + 1}`],
    };

    // prepare properties
    Object.keys(storables).forEach(key => {
      storables[key] = reactive(new Storable(...storables[key]));
    });

    return {...storables, ...props};
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
    }
  }
}