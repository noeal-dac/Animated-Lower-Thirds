const ImageSelector = {
  template: '#image-selector-template',
  props: ['ltsContainer'],
  setup() {
  },
  data() {
    return {
      active: false,
      previewSrc: '',
      isDefault: false,
      logoSrc: '',
      defaultArray: '',
      logoFile: '',
      index: 0,
    }
  },
  methods: {
    open(index, logoSrc, defaultArray, isDefault = false) {
      this.active = true;
      this.index = index;
      this.logoSrc = logoSrc;
      this.defaultArray = defaultArray;
      this.isDefault = isDefault;
      this.previewSrc = isDefault ? defaultArray.value[index] : logoSrc.value;
      this.oldSrc = this.previewSrc;
    },

    removeLogo() {
      this.previewSrc = '';
      this.logoFile = '';
    },

    showPreview(event) {
      const element = event.target;
      if (element.files.length > 0) {
        this.logoFile = element.files[0];
        this.previewSrc = URL.createObjectURL(element.files[0]);
      }
    },

    ok() {
      if (this.logoFile && this.previewSrc != this.oldSrc) {
        const src = "../logos/" + this.logoFile.name;

        //Change the lt logo if it is default
        if (this.isDefault) {
          this.defaultArray.value[this.index] = src;
          this.defaultArray.update();

          this.$emit('defaultChanged');
				} else {
          this.logoSrc.value = src;
          this.$emit('logoChanged');
				}
      } else if (!this.isDefault && !this.previewSrc) {
        this.logoSrc.value = this.defaultArray.value[this.index];
        this.$emit('logoChanged');
      }
      
      this.active = false;
    }
  }
}