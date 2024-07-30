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

const editor = new Editor()

// tests adding
editor.add('foo')
editor.dump() // should see 'foo'
editor.add('bar')
editor.dump() // should see 'foobar'

// tests undoing an add
editor.undo()
editor.dump() // should see 'foo'

// tests editing
editor.add('bar')
editor.edit('baz')
editor.dump() // should see 'foobaz'

// tests undoing an edit
editor.undo()
editor.dump() // should see 'foobar'

// tests deleting
editor.delete()
editor.dump() // should see 'foo'

// tests editing after deleting
editor.edit('bar')
editor.dump() // should see 'bar'

// tests undoing an edit after deleting
editor.undo()
editor.dump() // should see 'foo'

// tests undoing a delete
editor.delete()
editor.dump() // should see ''
editor.undo()
editor.dump() // should see 'foo'

// the following should be logged in the console:
// foo
// foobar
// foo
// foobaz
// foobar
// foo
// bar
// foo
//
// foo

