const App = {
    template: '#app-template',
    components: {
        MainSettings,
        LowerThirdsContainer,
        ImageSelector
    },
    mounted() {
        this.initTooltips();
        
        // const mainSettings = this.$refs.mainSettings;
        // const ltsRefs = this.$refs.ltsContainer.$refs;
        // setTimeout(() => {
        //     Object.values(ltsRefs)
        //           .map(val => val[0])
        //           .forEach(lt => lt.config.globalProperties.mainSettings = mainSettings);
        // }, 100)
        // // console.log(Object.values(this.$refs.ltsContainer.$refs).map(val => val[0]));
    },
    methods: {
        initTooltips() {
            Object.keys(TOOLTIP).forEach(id => {
                const elem = document.querySelector(`[id$=${id}]`);
                if (elem) {
                    elem.setAttribute('title', TOOLTIP[id]);
                } else {
                    console.log(id, elem);
                }
            });
          
            
            if (this.$refs.mainSettings.enabledTooltips.value) {
                $(document).tooltip({
                    disabled: false,
                    show: { delay: 600, duration: 200 },
                    open: function(event, ui)  
                    {
                    ui.tooltip.hover(  
                        function () {  
                        $(this).fadeTo("slow", 0.2);  
                        });  
                    },
                    content: function() {
                    return $(this).attr("title");
                    }
                });
            } else {
                $(document).tooltip({disabled: true});
            }
        },
        checkSwitches() {
            const mainSettings = this.$refs.mainSettings;
            Object.values(this.$refs.ltsContainer.$refs)
                  .map(val => val[0])
                  .forEach(lt => {
                        lt.active = mainSettings.active.value && lt.inactiveTimeMonitor == 0 && lt.switchOn;
                        lt.inactive = ((mainSettings.active.value && lt.inactiveTimeMonitor > 0) || 
                                        !mainSettings.active.value)	&& lt.switchOn;
                  });
        },
        checkPreviews() {
            const mainSettings = this.$refs.mainSettings;
            Object.values(this.$refs.ltsContainer.$refs)
                  .map(val => val[0])
                  .forEach(lt => {
                        lt.enabledPreview = mainSettings.enabledPreview.value;
                  });
        },
        openLogo(args) {
            let {index, logoSrc, defaultArray, isDefault} = args;
            if (!defaultArray) {
                defaultArray = this.$refs.mainSettings.defaultLogos;
            }
            this.$refs.imageSelector.open(index, logoSrc, defaultArray, isDefault);
        },
        checkLogos() {
            const mainSettings = this.$refs.mainSettings;
            Object.values(this.$refs.ltsContainer.$refs)
                  .map(val => val[0])
                  .forEach((lt, index) => {
                        if (lt.isDefaultLogo) {
                            lt.logoSrc.value = mainSettings.defaultLogos.value[index];
                        }
                  });
        },
        updateIsDefault() {
            const mainSettings = this.$refs.mainSettings;
            Object.values(this.$refs.ltsContainer.$refs)
                  .map(val => val[0])
                  .forEach((lt, index) => {
                        lt.isDefaultLogo = lt.logoSrc.value == mainSettings.defaultLogos.value[index];
                  });

        }
    }
};