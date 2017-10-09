# vue-balloon

> Vue.js plugin to create a floating element that expands when clicked.

Check out the example [here](https://kevinwarne.github.io/vue-balloon/).

## Dependencies

This plugin uses font awesome icons so either include that or redefine custom icons for the classes `.fa-chevron-up`, `.fa-chevron-down`, `.fa-expand`, `.fa-compress`, `.fa-close`.

## Install & Basic Usage

Add as dependency with npm or yarn.

`npm install vue-balloon --save`

or

`yarn add vue-balloon`

```html
<template>
  <div id = 'demo'>
    <balloon
      title = 'One Cute Cat'
      position = 'bottom-right'
      @maximize = 'playVideo'
      @minimize = 'pauseVideo'
    >
      <!-- balloon content goes here.. for example a youtube video with the vue-youtube-embed plugin -->
      <youtube video-id = '0Bmhjf0rKe8' ref = 'player'>
      </youtube>
    </balloon>
  </div>
</template>

<script>
  import { Balloon } from 'vue-balloon'

  export default {
    components: { Balloon },

    methods: {
      playVideo () {
        this.$refs.player.player.playVideo()
      },

      pauseVideo () {
        this.$refs.player.player.pauseVideo()
      }
    }
  }
</script>
```

## props

```javascript
props: {
  // balloon title
  title: {
    default: ''
  },

  // position: bottom-right, bottom-left, top-right, or top-left
  position: {
    default: 'bottom-right'
  },

  // enable the css transform: scale() effect
  zooming: {
    default: false
  },

  // hide the close (x) icon on the balloon
  hideCloseButton: {
    default: false
  },

  // hide the concise (chevron) icons on the balloon
  hideConciseButton: {
    default: false
  }
}
```

## Contributing

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build demo (used to prepare for gitlab pages)
npm run build:demo

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
