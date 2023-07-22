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
      const src = this.logoFile;
      const preview = document.getElementById(this.logo)

			const alt_logo_preview = this.defaultLogo.replace("-default", "-preview");

      if(src){
        preview.src = "../logos/" + src.name;
        
        //Change the lt logo if it use default
        if (this.isDefault && $("#" + alt_logo_preview).hasClass('default')){
          $("#" + alt_logo_preview).attr("src", preview.src).change();
        }
				} else if (!this.previewSrc) {
          preview.src = $("#" + logo_default).attr("src");
				}
      
      this.active = false;
    }
  }
}