# Text Fields

The `<hwc-text-field>` component is a highly customizable and reactive text input field, designed to make it easy to create interactive forms. It allows developers to create text fields to capture data such as **names**, **emails** and **passwords**, applying validation rules to ensure that the data entered is valid and secure.

This component is useful in any web application that requires the collection of user information through forms and seeks to simplify the validation process and error handling.

## Table of contents

- [Text Fields](#text-fields)
  - [Table of contents](#table-of-contents)
  - [Basic usage](#basic-usage)
  - [Appearance](#appearance)
  - [Colors](#colors)
  - [Label](#label)
  - [Placeholder](#placeholder)
  - [Type](#type)
  - [Name](#name)
  - [Autofocus](#autofocus)
  - [Disabled](#disabled)
  - [Readonly](#readonly)
  - [Hint](#hint)
  - [Clearable](#clearable)
  - [Slots: prepend-inner \& append-inner](#slots-prepend-inner--append-inner)
  - [Validations](#validations)
  - [Error messages](#error-messages)
  - [Custom validations](#custom-validations)
  - [Mask](#mask)
  - [CSS Custom Properties](#css-custom-properties)

## Basic usage

**Typescript/Javascript**

```ts
import '@holejs/wc/text-field/text-field.js'
```

**HTML**

```html
<hwc-text-field
  appearance="outlined"
  name="fullname"
  label="Fullname"
  placeholder="Ivan Zaldivar"
></hwc-text-field>
```

## Appearance

Defines the visual style of the text field. The available values are: `outlined` y `underline`.

```html
<!-- It is not necessary to specify. -->
<hwc-text-field appearance="outlined"></hwc-text-field>

<hwc-text-field appearance="underline"></hwc-text-field>
```

## Colors

The color property allows you to modify the color of the component.

```html
<hwc-text-field color="blue-darken-2"></hwc-text-field>

<hwc-text-field color="#758D46"></hwc-text-field>

<hwc-text-field color="rgb(70, 141, 130)"></hwc-text-field>
```

> **NOTE**: You can see the color palette in the following link [Color palette](https://github.com/holejs/wc#color-palette)

## Label

Label that describes the purpose or content of the text field.

```html
<hwc-text-field label="Email"></hwc-text-field>
```

## Placeholder

Text that is displayed as a hint or guide within the text field before the user enters a value.

```html
<hwc-text-field placeholder="Exam: abc@domain.com"></hwc-text-field>
```

## Type

Type of the text field, for example, `text`, `email`, `password`, etc. Default value: `text`.

```html
<hwc-text-field type="password"></hwc-text-field>
```

## Name

Name of the text field that is used to identify the value entered in the form.

```html
<hwc-text-field name="fullname"></hwc-text-field>
```

## Autofocus

If this property is set, the text field will automatically get focus when the page loads.

```html
<hwc-text-field autofocus></hwc-text-field>
```

## Disabled

If this property is set, the text field will be disabled and the user will not be able to interact with it.

```html
<hwc-text-field disabled></hwc-text-field>
```

## Readonly

If this property is set, the text field will be read-only and the user will not be able to modify its value.

```html
<hwc-text-field readonly></hwc-text-field>
```

## Hint

Provides a hint or instruction to help the user complete the field.

```html
<hwc-text-field hint="Enter your email. For example: ivan@gmail.com"></hwc-text-field>
```

## Clearable

If this property is set, a button will be displayed that allows the user to clear the value of the text field.

```html
<hwc-text-field clearable></hwc-text-field>
```

## Slots: prepend-inner & append-inner

The text fields allow adding slots to add graphic elements such as icons.

```html
<!-- Prepend -->
<hwc-text-field>
  <span style="display: flex;" slot="prepend-inner">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
    </svg>
  </span>
</hwc-text-field>

<!-- Append -->
<hwc-text-field>
  <span style="display: flex;" slot="append-inner">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
    </svg>
  </span>
</hwc-text-field>
```

## Validations

Validations are rules that are used to ensure that the value of the text field is valid. For example, a validation can ensure that the text field is not empty, that the value is an integer, or that it meets certain format criteria (for example, a valid email address). Below is a list of available rules:

- `required`: Specifies whether a form field needs to be completed before the form is submitted.
- `minlength` & `maxlength`: Specifies the minimum and maximum length of a text string.
- `min` & `max`: Specifies the minimum and maximum values for numeric input types.
- `email`: Specifies that the field will be valid when the text string matches the pattern of an email.
- `pattern`: Specifies a regular expression that defines a pattern that the input data should follow. For example: validate a password.

> The validations made to the text fields follow the guidelines by MDN. For more information visit the following link: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation

A more important consideration, is that when you use these custom text fields they will behave similarly to the native text fields (input). So when you submit the form, the typical tooltips will be shown along with the custom validations. If you do not want this behavior you will need to disable form validations.

```html
<form novalidate>
  <!-- ... -->
</form>

<script>
  document.querySelector('form').addEventListener('submit', (ev) => {
    ev.preventDefault()

    const $form = ev.target

    if (!$form.checkValidity()) {
      // ⛔ Invalid form.
      return;
    }

    // ✅ Valid form.
    // More code...
  })
</script>
```

Below are some examples:

**1. Validate a person's name.**

For this example, the field needs to be required, have at least 5 characters, and not exceed 50 characters.

```html
<hwc-text-field
  name="fullname"
  rules="required|minlength:5|maxlength:50"
></hwc-text-field>
```

**2. Validate email.**

For this example, the field needs to be required and to be a valid email.

```html
<hwc-text-field
  name="fullname"
  rules="required|email"
></hwc-text-field>
```

**3. Validate password.**

This example requires that the field be required and that the password meets the following criteria:

- Contain at least 8 characters.
- An uppercase letter
- A symbol
- A number.

```html
<hwc-text-field
  name="fullname"
  rules="required|pattern:^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
></hwc-text-field>
```

As you can see, it's that easy to add validations in real time (as the user types) by simply defining these rules. Surprising isn't it?

Now, you may need to customize these error messages. Don't worry, you can do it too. See the next section [Error messages.](#error-messages)

## Error messages

It is very likely that the default error messages will not meet your needs, but there is nothing to worry about, customizing the error messages is super easy. Let's see it in the following example:

```html
<hwc-text-field
  name="fullname"
  rules="required|minlength:5|maxlength:50"

  data-error-message-required="This field is required."
  data-error-message-minlength="Must contain at least 5 characters."
  data-error-message-maxlength="Must contain a maximum of 50 characters."
></hwc-text-field>
```

Excellent, by doing this you have already customized the error messages.

## Custom validations

Unlike default validations, such as **length validations** (`minlength` and `maxlength`) or **format validations** (`pattern`), custom validations allow developers to create specific validation rules that tailor to the needs of their application.

These rules can encompass anything from validating the format of a phone number to checking if an email address already exists in the database. If the entered data does not meet a custom validation rule, a feedback message is displayed to the user to inform them about the error and assist them in correcting it.

Creating our own validation rules is extremely easy. Let's see the following example.

**This rule validates that the email entered by the user is from `gmail.com`**

```ts
const $firstName = document.querySelector('hwc-text-field[name="email"]')

$firstName.addRule({
  name: 'validate-google-email',
  handler: async ({ el }) => {
    const value = el.value

    // Regex for validate gmail.
    const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

    if (!regex.test(value)) {
      return { status: 'invalid', message: 'The email is not valid. You must use a gmail account.' }
    }

    return { status: 'complete' }
  }
})
```

Ready, this way we can define our own validations with their feedback messages. 💪

## Mask

The `mask` property allows you to define a mask for the text field. This mask will be applied to the value entered by the user, allowing you to format the value in a certain way. For example, you can use a mask to format a **phone number** or a **credit card number**.

> [!NOTE]
> To add masks to text fields, [Imask](https://imask.js.org/guide.html) is being used. Read their documentation for more details.

> [!TIP]
> Accompany your mask with the pattern property to validate the value entered by the user.

See the following examples:

**1. Card number**

```html
<hwc-text-field
  name="card_number"
  mask="0000 0000 0000 0000"
  rules="required|pattern:^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$"
></hwc-text-field>
```

**2. Phone number**

```html
<hwc-text-field
  name="phone_number"
  mask="(000) 0000-0000"
  rules="required|pattern:^\([0-9]{3}\) [0-9]{4}-[0-9]{4}$"
></hwc-text-field>
```

**3. Date**

```html
<hwc-text-field
  name="date"
  mask="00/00/0000"
  rules="required|pattern:^[0-9]{2}/[0-9]{2}/[0-9]{4}$"
></hwc-text-field>
```

## CSS Custom Properties

| Property Name                         | Description                                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `--hwc-text-field-primery-color`      | Defines the color of the text field when it is in the focused state (focus). Default: **unset**                     |
| `--hwc-text-field-background`                 | Defines the background color of the text field. Default: **unset**                                                  |
| `--hwc-text-field-font-family`        | Sets the font family for the text inside the text field. Default: **Nunito Sans, sans-serif**                           |
| `--hwc-text-field-input-font-color`   | Defines the text color of the entered text in the text field. Default: **unset**                                    |
| `--hwc-text-field-input-font-size`    | Sets the font size of the text inside the text field. Default: **16px**                                             |
| `--hwc-text-field-label-font-size`    | Sets the font size for the label of the text field. Default: **14px**                                               |
| `--hwc-text-field-label-font-color`   | Defines the text color of the label in the text field. Default: **unset**                                           |
| `--hwc-text-field-details-font-size`  | Sets the font size for the details or help messages in the text field. Default: **12px**                            |
| `--hwc-text-field-details-font-color` | Defines the text color of the details or help messages in the text field. Default: **unset**                        |
| `--hwc-text-field-padding`            | Defines the internal padding of the text field. Default: **15px**                                                   |
| `--hwc-text-field-border-color`       | Defines the border color of the text field. Default: **unset**                                                      |
| `--hwc-text-field-border-width`       | Sets the border width of the text field. Default: **2px**                                                           |
| `--hwc-text-field-border-style`       | Defines the border style of the text field. Default: **solid**                                                      |
| `--hwc-text-field-border-radius`      | Sets the border radius of the text field, creating rounded borders. Default: **10px**                               |
| `--hwc-text-field-transition`         | Sets the duration and transition function for the animations applied to the text field. Default: **200ms all ease** |
| `--hwc-text-field-error-color`        | Defines the color used to highlight the error status in a text field. Default: **--hwc-red-darken-2**               |
| `--hwc-text-field-inner-color`        | Defines the internal color (only applies to slots) of a text field.                                                 |
