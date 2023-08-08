const LowerThirdSource = {
    template: '#lower-third-template',
    props: ['index'],
    setup(args) {
        const props = {
            switchOn: ref(false),
            active: ref(false),
            hide: ref(true),
            animationIn: ref(false),
            animationOut: ref(false),
            stylesInitialized: ref(false),

            name: ref(''),
            info: ref(''),
            logoSrc: ref(''),

            animationTime: ref(2),
            activeTime: ref(25),
            inactiveTime: ref(420),

            activeTimer: ref(0),
            inactiveTimer: ref(0),

            readables: []
        };

        const readables = {
            nameTransform: `alt2-${args.index}-name-transform`,
            nameBold: `alt2-${args.index}-name-bold`,            // lighter | bold
            nameItalic: `alt2-${args.index}-name-italic`,        // normal | italic
            nameColor: `alt2-${args.index}-name-color`,
            
            infoTransform: `alt2-${args.index}-info-transform`,
            infoBold: `alt2-${args.index}-info-bold`,
            infoItalic: `alt2-${args.index}-info-italic`,
            infoColor: `alt2-${args.index}-info-color`,
            
            enabledLogo: `alt2-${args.index}-logo`,
            logoSizeReadable: `alt2-${args.index}-logo-size`,

            style: `alt2-${args.index}-style`,
            align: `alt2-${args.index}-align`,
            size: `alt2-${args.index}-size`,
            marginH: `alt2-${args.index}-margin-h`,
            marginV: `alt2-${args.index}-margin-v`,
            inverseRatio: `alt2-${args.index}-inverse-ratio`,
            lineSpacingReadable: `alt2-${args.index}-line-spacing`,
            font: `alt2-${args.index}-font`,
            
            shadows: `alt2-${args.index}-shadows`,
            shadowAmountReadable: `alt2-${args.index}-shadow-amount`,
            
            background: `alt2-${args.index}-background`,
            backgroundColor1: `alt2-${args.index}-background-color-1`,
            backgroundColor2: `alt2-${args.index}-background-color-2`,
            
            cornersReadable: `alt2-${args.index}-corners`,
            
            borders: `alt2-${args.index}-borders`,
            borderThicknessReadable: `alt2-${args.index}-border-thickness`,
            bordersColor1: `alt2-${args.index}-borders-color-1`,
            bordersColor2: `alt2-${args.index}-borders-color-2`,
        };
    
        // prepare properties
        Object.keys(readables).forEach(key => {
            readables[key] = reactive(new Readable(readables[key]));
            props.readables.push(key);
        });
    
        return {...props, ...readables};
    },
    computed: {
        classes() {
            const align = this.style.value == 1 && this.align.value == 'center' ? 'left' : this.align.value;

            return ['alt',
                {
                    'hide-anim': this.hide,
                    'animation-in': this.active,
                    'animation-out': !this.active,
                },
                align,
                `style-${this.style.value}`,
            ];
        },
        nameSize() {
            return 1 + this.inverseRatio.value * 0.1;
        },
        infoSize() {
            return 2 - this.inverseRatio.value * 0.1;
        },
        logoSize() {
            return this.logoSizeReadable.value * 0.25 + 3.5;
        },
        lineSpacing() {
            return this.lineSpacingReadable.value * 0.1;
        },
        borderThickness() {
            return this.borders.value ? this.borderThicknessReadable.value * 0.1 : 0;
        },
        shadowAmount() {
            return this.shadowAmountReadable.value * 0.1;
        },
        corners() {
            return this.cornersReadable.value * 0.25;
        },
        color1() { return this.background ? this.backgroundColor1.value : 'none'; },
        color2() { return this.background ? this.backgroundColor2.value : 'none'; },
        color3() { return this.border ? this.bordersColor1.value : 'none'; },
        color4() { return this.border ? this.bordersColor2.value : 'none'; },
    },
    mounted() {
        const styles = document.createElement('style');
        styles.innerHTML = this.getStyles();
        document.body.append(styles);
    },
    methods: {
        update(switchState, animationTime, activeTime, inactiveTime, isPreview, slotValues) {
            this.switchOn = switchState;
            
            // only update if not active
            if (!this.active || isPreview) {
                this.readables.forEach(key => this[key].update());
                this.animationTime = animationTime;
                this.activeTime = Math.max(animationTime, activeTime);
                this.inactiveTime = Math.max(animationTime, inactiveTime);
                this.name = slotValues.name;
                this.info = slotValues.info;
                this.logoSrc = slotValues.logoSrc;
            }

            // update animations if switch changed
            if (switchState != this.active) {
                this.animationIn = switchState;
                this.animationOut = !switchState;
                this.active = switchState;
                this.$emit('switchChanged', this);
            }

            if (this.hide && this.active) {
                this.hide = false;
            }
        },
        updateSlot(slotValues) {
            if (this.switchOn) {
                // wait until animation is done => then update
                const updateTimer = setInterval(() => {
                    if (this.inactiveTimer > this.animationTime) {
                        this.name = slotValues.name;
                        this.info = slotValues.info;
                        this.logoSrc = slotValues.logoSrc;
                        clearInterval(updateTimer);
                    }
                }, 500);
            }
        },
        updateStyles(isPreview) {
            const waitUntilInactive = setInterval(() => {
                if (this.hide || !this.stylesInitialized || isPreview) {
                    this.updateCss();
                    clearInterval(waitUntilInactive);
                }
            }, 100);
        },
        updateCss() {
            console.log('update css');
            this.readables.forEach(key => this[key].update());
            this.stylesInitialized = true;
            
            const root = document.documentElement;
            root.style.setProperty(`--alt-${this.index}-background`, this.background.value && !this.color2.endsWith(',0)') ? 1 : 0);
        	root.style.setProperty(`--alt-${this.index}-animation-time`, this.animationTime + "s");
		
			//texts styling
			root.style.setProperty(`--alt-${this.index}-size`, this.size.value + "px");
			root.style.setProperty(`--alt-${this.index}-margin-h`, this.marginH.value + "rem");
			root.style.setProperty(`--alt-${this.index}-margin-v`, this.marginV.value + "rem");
			root.style.setProperty(`--alt-${this.index}-line-spacing`, this.lineSpacing + "em");
			root.style.setProperty(`--alt-${this.index}-name-size`, this.nameSize + "em");
			root.style.setProperty(`--alt-${this.index}-info-size`, this.infoSize + "em");
			root.style.setProperty(`--alt-${this.index}-name-transform`, this.nameTransform.value ? 'uppercase' : 'normal');
			root.style.setProperty(`--alt-${this.index}-info-transform`, this.infoTransform.value ? 'uppercase' : 'normal');
			root.style.setProperty(`--alt-${this.index}-name-italic`, this.nameItalic.value ? 'italic' : 'normal');
			root.style.setProperty(`--alt-${this.index}-info-italic`, this.infoItalic.value ? 'italic' : 'normal');
			root.style.setProperty(`--alt-${this.index}-name-bold`, this.nameBold.value ? 'lighter' : 'bold');
			root.style.setProperty(`--alt-${this.index}-info-bold`, this.infoBold.value ? 'lighter' : 'bold');
			root.style.setProperty(`--alt-${this.index}-name-color`, this.nameColor.value);
			root.style.setProperty(`--alt-${this.index}-info-color`, this.infoColor.value);
			root.style.setProperty(`--alt-${this.index}-style-color-1`, this.color1);
			root.style.setProperty(`--alt-${this.index}-style-color-2`, this.color2);
			root.style.setProperty(`--alt-${this.index}-style-color-3`, this.color3);
			root.style.setProperty(`--alt-${this.index}-style-color-4`, this.color4);
			root.style.setProperty(`--alt-${this.index}-font`, this.font.value);
			root.style.setProperty(`--alt-${this.index}-logo-size`, this.logoSize + "em");
			root.style.setProperty(`--alt-${this.index}-corners`, this.corners + "em");
			root.style.setProperty(`--alt-${this.index}-border-switch`, this.borders.value);
			root.style.setProperty(`--alt-${this.index}-border-thickness`, this.borderThickness + "rem");

            if (!this.shadows.value){
				root.style.setProperty(`--alt-${this.index}-shadows`, "none");
				root.style.setProperty(`--alt-${this.index}-shadows-graph`, "none");
			} else {
				root.style.setProperty(`--alt-${this.index}-shadows`, "0.1rem 0.1rem 0.2rem rgba(0,0,0," + alt_1_shadow_amount + ")");
				if (!this.background){
					root.style.setProperty(`--alt-${this.index}-shadows-graph`, "none");
				} else {
					root.style.setProperty(`--alt-${this.index}-shadows-graph`, "0.1rem 0.1rem 0.2rem rgba(0,0,0," + alt_1_shadow_amount + ")");
				} 
			}
        },
        getStyles() {
            return `
            :root {
                --alt-${this.index}-animation-time: 4s;
            }

            #lower-third-${this.index}.animation-in > div:first-child img,
            #lower-third-${this.index}.animation-out > div:first-child img {
                animation-duration: var(--alt-${this.index}-animation-time);
            }

            #lower-third-${this.index}.animation-in > div:nth-child(1), #lower-third-${this.index}.animation-in > div:nth-child(2), #lower-third-${this.index}.animation-in > div:nth-child(4),
            #lower-third-${this.index}.animation-out > div:nth-child(1), #lower-third-${this.index}.animation-out > div:nth-child(2), #lower-third-${this.index}.animation-out > div:nth-child(4) {
                animation-duration: var(--alt-${this.index}-animation-time);
            }

            #lower-third-${this.index}.animation-in > .text-content > div:first-child div, #lower-third-${this.index}.animation-in > .text-content > div:nth-child(2) div,
            #lower-third-${this.index}.animation-out > .text-content > div:first-child div, #lower-third-${this.index}.animation-out > .text-content > div:nth-child(2) div {
                animation-duration: var(--alt-${this.index}-animation-time);
            }

            #lower-third-${this.index}.alt{
                font-size: var(--alt-${this.index}-size);
            }

            #lower-third-${this.index}.left{
                left: var(--alt-${this.index}-margin-h);
                bottom: var(--alt-${this.index}-margin-v);
            }
            #lower-third-${this.index}.right{
                flex-direction: row-reverse;
                right: var(--alt-${this.index}-margin-h);
                bottom: var(--alt-${this.index}-margin-v);
            }
            #lower-third-${this.index}.center{
                bottom: var(--alt-${this.index}-margin-v);
            }

            #lower-third-${this.index} > div.text-content > div:first-child {
                height: calc(var(--alt-${this.index}-name-size) + 0.25em);
                margin-bottom: var(--alt-${this.index}-line-spacing);
                transition: margin 0.1s;
            }
            #lower-third-${this.index} > div.text-content > div:nth-child(2) {
                height: calc(var(--alt-${this.index}-info-size) + 0.25em);
            }

            /* name */
            #lower-third-${this.index} > div.text-content > div:first-child div {
                font-family: var(--alt-${this.index}-font);
                font-size: var(--alt-${this.index}-name-size);
                font-style: var(--alt-${this.index}-name-italic);
                font-weight: var(--alt-${this.index}-name-bold);
                text-transform: var(--alt-${this.index}-name-transform);
                color: var(--alt-${this.index}-name-color);
                text-shadow : var(--alt-${this.index}-shadows);
            }

            /* info */
            #lower-third-${this.index} > div.text-content > div:nth-child(2) div {
                font-family: var(--alt-${this.index}-font);
                font-size: var(--alt-${this.index}-info-size);
                font-style: var(--alt-${this.index}-info-italic);
                font-weight: var(--alt-${this.index}-info-bold);
                text-transform: var(--alt-${this.index}-info-transform);
                color: var(--alt-${this.index}-info-color);
                text-shadow : var(--alt-${this.index}-shadows);	
            }

            /* logo */
            #lower-third-${this.index} > .logo img {
                max-height: var(--alt-${this.index}-logo-size);
            }

            /* style 1 */
            #lower-third-${this.index}.style-1 > .graph-1 {
                background: var(--alt-${this.index}-style-color-1);
                /* box-shadow : var(--alt-${this.index}-shadows);	 */
                box-shadow : var(--alt-${this.index}-shadows-graph);
            }

            #lower-third-${this.index}.style-1 > .graph-2 {
                background: var(--alt-${this.index}-style-color-2);
                opacity: var(--alt-${this.index}-background);
                border: solid var(--alt-${this.index}-border-thickness);
                border-color: var(--alt-${this.index}-style-color-3);
                border-radius: calc(var(--alt-${this.index}-corners) * 1.1);
                box-shadow: var(--alt-${this.index}-shadows-graph);
            
            }

            /* style 2 */
            #lower-third-${this.index}.style-2 > div.text-content > div:first-child {
                height: calc(var(--alt-${this.index}-name-size) + 1.2rem);
                padding: 0 0.2rem 0 0;
            }

            #lower-third-${this.index}.style-2 > div.text-content > div:first-child div::after {
                background: var(--alt-${this.index}-style-color-1);
                /* opacity: var(--alt-${this.index}-background); */
                box-sizing: border-box;
                border: solid var(--alt-${this.index}-border-thickness);
                border-color: var(--alt-${this.index}-style-color-3);
                border-radius: var(--alt-${this.index}-corners);
                box-shadow: var(--alt-${this.index}-shadows-graph);
            }

            #lower-third-${this.index}.style-2 > div.text-content > div:nth-child(2) {
                height: calc(var(--alt-${this.index}-info-size) + 1.2rem);
                padding: 0 0.2rem 0 0;
            }

            #lower-third-${this.index}.style-2 > div.text-content > div:nth-child(2) div::after {
                background: var(--alt-${this.index}-style-color-2);
                box-sizing: border-box;
                border: solid var(--alt-${this.index}-border-thickness);
                border-color: var(--alt-${this.index}-style-color-4);
                border-radius: var(--alt-${this.index}-corners);
                box-shadow: var(--alt-${this.index}-shadows-graph);
            }

            /* style 3 */
            #lower-third-${this.index}.style-3 > .graph-1 {
                background: var(--alt-${this.index}-style-color-1);
                box-shadow: var(--alt-${this.index}-shadows-graph);
                border: var(--alt-${this.index}-border-thickness) solid var(--alt-${this.index}-style-color-3);
                border-radius: calc(var(--alt-${this.index}-corners) * 1.1);
            }

            #lower-third-${this.index}.style-3 > .graph-2 {
                background: var(--alt-${this.index}-style-color-2);
                box-shadow: var(--alt-${this.index}-shadows-graph);
                opacity: var(--alt-${this.index}-background);
                border: var(--alt-${this.index}-border-thickness) solid var(--alt-${this.index}-style-color-4);
            }

            #lower-third-${this.index}.style-3.left > .graph-2 {
                border-radius: 0 var(--alt-${this.index}-corners) var(--alt-${this.index}-corners) 0;
            }

            #lower-third-${this.index}.style-3.right > .graph-2 {
                border-radius: var(--alt-${this.index}-corners) 0 0 var(--alt-${this.index}-corners);
            }
            `;
        }
    }
};