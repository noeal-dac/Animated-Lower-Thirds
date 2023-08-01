const App = {
    template: '#app-template',
    components: {
        MainSettings,
        LowerThird,
        ImageSelector
    },
    setup() {
        const props = {
            fonts: reactive({}),
            enabledPreview: ref(false),
            previewCollapsed: ref(true),
        };

        Object.assign(props['fonts'], DEFAULT_FONTS);

        const storables = {
            lts: ['alt-sort-order', [0,1,2,3]]
        };
    
        // prepare properties
        Object.keys(storables).forEach(key => {
            storables[key] = reactive(new Storable(...storables[key]));
        });
      
        return {...props, ...storables};
    },
    mounted() {
        this.initTooltips();
        this.updateFonts();
        this.checkAppearance();

        $( "#sortable" ).sortable({handle: ".drag-handle"});
        $( "#sortable" ).on("sortupdate", this.updateSortOrder);
        $( "#sortable" ).disableSelection();
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
        updateSortOrder() {
            const sorted = $('#sortable').sortable("toArray").map(val => parseInt(val.replace('alt-', '')));
            this.lts.value = sorted;
        },
        checkSwitches() {
            const mainSettings = this.$refs.mainSettings;
            Object.values(this.$refs.lt)
                  .forEach(lt => {
                        lt.active = mainSettings.active.value && lt.inactiveTimeMonitor == 0 && lt.switchOn;
                        lt.inactive = ((mainSettings.active.value && lt.inactiveTimeMonitor > 0) || 
                                        !mainSettings.active.value)	&& lt.switchOn;
                  });
        },
        checkAppearance() {
            const mainSettings = this.$refs.mainSettings;

            if (mainSettings) {
                this.enabledPreview = mainSettings.enabledPreview.value;
            }

            Object.values(this.$refs.lt)
                  .forEach(lt => {
                        lt.enabledPreview = mainSettings.enabledPreview.value;
                        lt.switchLeft = mainSettings.switchesLeft.value;
                        lt.hiddenSlotNumbers = mainSettings.hiddenSlotNumbers.value;
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
            Object.values(this.$refs.lt)
                  .forEach((lt, index) => {
                        if (lt.isDefaultLogo) {
                            lt.logoSrc.value = mainSettings.defaultLogos.value[index];
                        }
                  });
        },
        updateIsDefault() {
            const mainSettings = this.$refs.mainSettings;
            Object.values(this.$refs.lt)
                  .forEach((lt, index) => {
                        lt.isDefaultLogo = lt.logoSrc.value == mainSettings.defaultLogos.value[index];
                  });

        },
        updateFonts() {
            const mainSettings = this.$refs.mainSettings;
            Object.assign(this.fonts, {'custom': mainSettings.customFonts.value.map(val => val.name)});
        }
    }
};