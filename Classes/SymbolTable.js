class SymbolTable {
  constructor(parent = null) {
    this.symbols = {}
    this.parent = parent;
  }

  get(name) {
    let value = this.symbols[name];
    if (!value && this.parent) {
      return this.parent.get(name);
    }
    return value;
  }

  set(name, value) {
    this.symbols[name] = value;
  }

  remove(name) {
    delete this.symbols[name];
  }
}

export default SymbolTable;