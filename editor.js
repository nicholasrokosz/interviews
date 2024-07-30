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
    if (this.content.length > 0) {
      const deletedValue = this.content.pop()
      this.undoStack.push({ action: 'delete', value: deletedValue })
    }
  }

  undo() {
    if (this.undoStack.length > 0) {
      const lastAction = this.undoStack.pop()
      switch (lastAction.action) {
        case 'add':
          this.content.pop()
          break
        case 'edit':
          this.content.pop()
          this.content.push(lastAction.oldValue)
          break
        case 'delete':
          this.content.push(lastAction.value)
          break
      }
    }
  }
}

