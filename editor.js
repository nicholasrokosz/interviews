class Editor {
  constructor() {
    this.content = []
    this.undoStack = []
  }

  dump() {
    console.log(this.content.join(''))
  }

  add(str) {
    this.content.push(str)
    this.undoStack.push({ action: 'add', value: str })
  }

  edit(str) {
    if (this.content.length > 0) {
      const oldValue = this.content.pop()
      this.content.push(str)
      this.undoStack.push({ action: 'edit', oldValue, newValue: str })
    }
  }

  delete() {
  }

  undo() {
  }
}

