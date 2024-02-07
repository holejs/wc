# Avatars

`HWCAvatar` is a customizable avatar component that can be used to display user profile pictures or name initials in a web interface.

## Basic usage

**Displaying Name Initials**

```html
<hwc-avatar name="Ivan Guevara" alt="Profile Picture"></hwc-avatar>
```

**Avatar with Image**

```html
<hwc-avatar src="avatar.jpg" alt="Profile Picture"></hwc-avatar>
```

## Appearance

This property is useful when we want to modify the appearance of the component, the available values are: `circle` & `square`. By default, its value is `circle`.

```html
<hwc-avatar appearance="circle"></hwc-avatar>

<hwc-avatar appearance="square"></hwc-avatar>
```

## Color

The color property allows you to modify the color of the component. You can define color in multiple formats `hex`, `rgb`, `rgba` & [Color palette](/src/assets/colors.css).

```html
<hwc-avatar name="Ivan Guevara" alt="Profile Picture" color="#6e6ce8"></hwc-avatar>

<hwc-avatar name="Ivan Guevara" alt="Profile Picture" color="red-lighten-5"></hwc-avatar>
```

## Additional Properties

| Property     | Type                           | Description                                                |
| ------------ | ------------------------------ | ---------------------------------------------------------- |
| `role`       | string                         | The role attribute of the avatar.                          |
| `alt`        | string                         | Alternative text for the avatar image.                     |
| `name`       | string                         | User's name to display as initials or as alternative text. |
| `color`      | string                         | Custom color for the avatar, in hexadecimal format.        |
| `appearance` | string           | Avatar's appearance, can be `circle` or `square`.          |
| `size`       | string | Avatar's size, can be `small`, `medium`, or `large`.       |
| `src`        | string                         | URL of the image to display as an avatar.                  |

## CSS Custom Props

| Property                      | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| `--hwc-avatar-size`           | Avatar size. Default is **50px**.                                         |
| `--hwc-avatar-color`          | Background color of the avatar. Default is **var(--hwc-blue-darken-2)**.  |
| `--hwc-avatar-text-color`     | Text color of the avatar. Default is **#fff**.                            |
| `--hwc-avatar-font-size`      | Font size of the avatar text. Default is **1.4rem**.                      |
| `--hwc-avatar-font-weight`    | Font weight of the avatar text. Default is **700**.                       |
| `--hwc-avatar-text-transform` | Text transformation of the avatar. Default is **uppercase**.              |
| `--hwc-avatar-font-family`    | Font family of the avatar text. Default is **'Nunito Sans', sans-serif**. |