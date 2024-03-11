# Todo's

- [ ] The alert component makes use of the button, it is necessary to create the button package
- [ ] Migrate all components to the new structure
- [ ] Remove all interactions in the storybook and moved to tha __tests__ folder
- [ ] Create a new package that manages the theme
- [ ] Add `build` command for all packages
- [ ] Syncronize mask when value is set using `input.value`. 
  ```ts
    private _setValue (value: string): void {
    if (this._imask) this._imask.value = value

    const _value = this._imask ? this._imask.value : value

    this.value = _value;

    (this.$input as HTMLInputElement).value = _value

    this.internals.setFormValue(_value)
  }
  ```
