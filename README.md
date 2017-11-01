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

## Multiple Balloons

To achieve multiple fixed balloons on the same page we use Vue's scoped slot functionality paired with the vue-balloon BalloonSet component.

```html
<template>
  <div id = 'demo'>
    <balloon-set
      position = 'bottom-right'
      :balloons = 'balloons'
    >
      <template scope = 'balloon'>
        <!--
          The multi balloon content goes here, scoped by the 'balloon' variable.
          In this example we will extract the videoId attribute from each
          balloon object to use in the video props
        -->
        <youtube :video-id = 'balloon.videoId' class = 'video'>
        </youtube>
      </template>
    </balloon-set>
  </div>
</template>

<script>
  import { BalloonSet } from '../src/index'

  export default {
    components: {
      BalloonSet
    },

    data () {
      return {
        balloons: [
          // Each balloon object can contain any props used in the balloon
          // component (other than the position prop that should be set on the
          // BalloonSet component instead). Events will also be propagated to
          // the balloon component from the nested 'on' object.
          {
            key: 1,
            videoId: '0Bmhjf0rKe8',
            title: 'One Cute Cat',
            on: {
              maximize (balloonRef) { console.log('maximized', balloonRef) },
              minimize (balloonRef) { console.log('minimized', balloonRef) }
            }
          },
          { key: 2, videoId: '28xjtYY3V3Q', title: 'And Some Cute Dogs!' }
        ]
      }
    }
  }
</script>
```

## Caveats and Gotchas

For multiple balloons with the **BalloonSet** component:
- Whenever a balloon is `maximized` to take up most of the window it will re-render the slot contents from scratch.
- If you need to have reactive data inside each balloon it is recommended to store it inside of a nested balloon object. Otherwise the attributes are considered slot props and cannot be modified. For example:

```html
<template>
  <div id = 'demo'>
    <balloon-set
      position = 'bottom-right'
      :balloons = 'balloons'
    >
      <template scope = 'balloon'>
        <!--
          Some balloon with form content
        -->
        Name: <input v-model = 'balloon.data.name'/>
      </template>
    </balloon-set>
  </div>
</template>

<script>
  import { BalloonSet } from '../src/index'

  export default {
    components: {
      BalloonSet
    },

    data () {
      return {
        balloons: [
          {
            key: 1,
            title: 'Edit Username',
            data: {
              name: 'Amelia Pond'
            }
          },
          {
            key: 2,
            title: 'Edit Username',
            data: {
              name: 'Rory Williams'
            }
          }
        ]
      }
    }
  }
</script>
```

## Component: `Balloon`

### `methods`

These methods are exposed by the balloon component if needed:

```javascript
methods: {
  // closes the balloon as if hitting the X button
  // note: closing the balloon merely sets the close data
  //   attribute and does not remove the component itself or
  //   remove it from the balloons array
  close () {}

  // reopen the balloon (reverse of close)
  open () {},

  // maximizes the balloon (full window)
  maximize () {
    this.balloonState.maximized = this.balloon
  },

  // minimizes the balloon (reverse of maximize)
  minimize () {
    this.balloonState.maximized = null
  }
}
```

### `events`

These events are emitted from the balloon component.

- `v-on:` `close`: when the balloon is closed
- `v-on:` `open`: when the balloon is opened
- `v-on:` `maximize`: when the balloon is maximized
- `v-on:` `minimize`: when the balloon is minimized

### `props`

```javascript
props: {
  // balloon title
  title: {
    default: '',
    type: String
  },

  // position: bottom-right, bottom-left, top-right, or top-left
  position: {
    default: 'bottom-right',
    type: String
  },

  // enable the css transform: scale() effect
  zooming: {
    default: false,
    type: Boolean
  },

  // hide the close (x) icon on the balloon
  hideCloseButton: {
    default: false,
    type: Boolean
  },

  // hide the concise (chevron) icons on the balloon
  hideConciseButton: {
    default: false,
    type: Boolean
  }

  // when balloon is created it will have this initial 'concise' state
  initiallyConcise: {
    default: false,
    type: Boolean
  }
}
```

## Component: `BalloonSet`

> BalloonSet was added in vue-balloon v1.0.18

### `props`

```javascript
props: {
  // position: bottom-right, bottom-left, top-right, or top-left
  // (overrides the Balloon component position)
  position: {
    default: 'bottom-right',
    type: String
  },

  // Balloon component data objects array, each object can contain props
  // that propagate to their own Balloon component
  balloons: {
    default: [],
    type: Array
  },

  // keep the minimized ballon when the corresponding balloon is maximized
  dockKeepMaximized: {
    default: false,
    type: Boolean
  },

  // keep the balloon dock in front of the mask when a balloon is maximized
  dockBringToFront: {
    default: false,
    type: Boolean
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
