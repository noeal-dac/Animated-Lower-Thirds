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
        this.updateFonts();
        this.checkAppearance();

        $( "#sortable" ).sortable({handle: ".drag-handle"});
        $( "#sortable" ).on("sortupdate", this.updateSortOrder);
        $( "#sortable" ).disableSelection();

        
        this.bc = new BroadcastChannel('obs-animated-lower-thirds'); //Send to browser source
        this.bc.onmessage = this.bcHandler;
    },
    methods: {
        initTooltips() {
            Object.keys(TOOLTIP).forEach(id => {
                const elems = document.querySelectorAll(`[id$=${id}]`);
                elems.forEach(elem => {
                    if (elem) {
                        elem.setAttribute('title', TOOLTIP[id]);
                    }
                });
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
        checkSwitches(send = true) {
            const mainSettings = this.$refs.mainSettings;
            Object.values(this.$refs.lt)
                  .forEach(lt => {
                        lt.active = mainSettings.active.value && lt.activeTimeMonitor > 0 && lt.inactiveTimeMonitor == 0 && lt.switchOn;
                        lt.inactive = !lt.active && lt.switchOn;
                  });
            
            if (send) {
                this.send();
            }
        },
        checkAppearance() {
            const mainSettings = this.$refs.mainSettings;

            if (mainSettings) {
                this.enabledPreview = mainSettings.enabledPreview.value;
                this.initTooltips();
            }

            Object.values(this.$refs.lt)
                  .forEach(lt => {
                        lt.enabledPreview = mainSettings.enabledPreview.value;
                        lt.switchLeft = mainSettings.switchesLeft.value;
                        lt.hiddenSlotNumbers = mainSettings.hiddenSlotNumbers.value;

                        if (!lt.enabledPreview) {
                            lt.previewOn = false;
                        }
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
        },
        bcHandler(msg) {
            const {timer, switchStates} = msg.data;

            Object.values(this.$refs.lt).forEach((lt, index) => {
                // state changes and lt has autoLoad enabled
                if (lt.active && !switchStates[index] && lt.autoLoad.value) {
                    lt.slotLoadNext();
                }
                
                lt.activeTimeMonitor = timer[index].activeTimer;
                lt.inactiveTimeMonitor = timer[index].inactiveTimer;
                lt.active = switchStates[index];
            });

            this.checkSwitches(false);
        },
        send() {
            // values that should be communicated:
            //      * which switches are on
            //      * which previews are on
            //      * aggregated times (animation, active, inactive)
            //      * values that are calculated from 
            console.log('send');
            const main = this.$refs.mainSettings;

            
            const switchStates = Object.values(this.$refs.lt)
                                       .map(lt => lt.switchOn && main.active.value);
            const previewStates = Object.values(this.$refs.lt)
                                        .map(lt => lt.previewOn);

            const animationTimes = Object.values(this.$refs.lt)
                                        .map(lt => lt.animationTime.value || main.animationTime.value);
            const activeTimes = Object.values(this.$refs.lt)
                                        .map(lt => {
                                        if (lt.customTimeSettings && lt.lockActive.value) {
                                            return Infinity;
                                        } else if (!lt.customTimeSettings && main.lockActive.value) {
                                            return Infinity;
                                        } else if (lt.customTimeSettings && lt.activeTime.value){
                                            return lt.activeTime.value
                                        } else {
                                            return main.activeTime.value;
                                        }
                                        });
            const inactiveTimes = Object.values(this.$refs.lt)
                                        .map(lt => {
                                            if (lt.customTimeSettings && lt.oneShot.value) {
                                                return Infinity;
                                            } else if (!lt.customTimeSettings && main.oneShot.value) {
                                                return Infinity;
                                            } else if (lt.customTimeSettings && lt.inactiveTime.value){
                                                return lt.inactiveTime.value
                                            } else {
                                                return main.inactiveTime.value;
                                            }
                                        });
            this.bc.postMessage({
                switchStates, previewStates, animationTimes, activeTimes, inactiveTimes
            });
        },
        sendSlotUpdate() {
            console.log('send slot update');
            this.bc.postMessage({ updateSlot: true });
        }
    }
};