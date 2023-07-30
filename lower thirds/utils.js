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

      if (newValue !== undefined) {
        newValue = JSON.stringify(newValue);
        localStorage.setItem(this.id, newValue);
      }
    }
  }