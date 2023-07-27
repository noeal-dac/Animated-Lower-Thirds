class Storable {
    _value;
  
    constructor(id, defaultValue) {
      this.id = id;
      this.defaultValue = defaultValue;
      this.loadValue();
    }
  
    loadValue() {
      const item = JSON.parse(localStorage.getItem(this.id));
      if (!item) {
        this.value = this.defaultValue;
      } else {
        this.value = item;
      }
    }
  
    get value() {
      return this._value;
    }
  
    set value(newValue) {
      this._value = newValue;
      newValue = JSON.stringify(newValue);
      localStorage.setItem(this.id, newValue);
    }
  }

function initTooltips() {
  Object.keys(TOOLTIP).forEach(id => {
    const elem = document.querySelector(`[id$=${id}]`);
    if (elem) {
      elem.setAttribute('title', TOOLTIP[id]);
    } else {
      console.log(id, elem);
    }
  });

  
  if (mainSettings.enabledTooltips.value) {
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
}