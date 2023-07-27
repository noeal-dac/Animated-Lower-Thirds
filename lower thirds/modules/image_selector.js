const ImageSelector = {
  setup() {
  },
  data() {
    return {
      active: false,
      previewSrc: '',
      isDefault: false,
      logo: '',
      defaultLogo: '',
      logoFile: ''
    }
  },
  methods: {
    open(logo, defaultLogo = undefined) {
      this.active = true;
      this.isDefault = !defaultLogo;
      
      this.logo = logo;
      this.defaultLogo = defaultLogo ? defaultLogo : logo;
    },

    removeLogo() {
      this.previewSrc = '';
      this.logo = '';
    },

    showPreview(event) {
      const element = event.target;
      if (element.files.length > 0) {
        this.logoFile = element.files[0];
        this.previewSrc = URL.createObjectURL(element.files[0]);
      }
    },

    ok() {
      let src = this.logoFile;
      const preview = document.getElementById(this.logo)

			const alt_logo_preview = this.defaultLogo.replace("-default", "-preview");

      if (src) {
        src = "../logos/" + src.name;
        
        //Change the lt logo if it is default
        if (this.isDefault && $("#" + this.defaultLogo).hasClass('alt-logo-default')){
          const index = parseInt(this.defaultLogo.replace('alt-', '').replace('-logo-default')) - 1;
          $("#" + this.defaultLogo).attr("src", src);

          console.log(src);
          
          mainSettings.defaultLogos.value[index] = src;
          mainSettings.defaultLogos.value = mainSettings.defaultLogos.value; // update localStorage
        }
				} else if (!this.previewSrc) {
          src = $("#" + this.defaultLogo).attr("src");
				}
      
      this.active = false;
    }
  }
}