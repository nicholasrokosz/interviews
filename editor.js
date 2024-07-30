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
  }

  delete() {
  }

  undo() {
  }
}

