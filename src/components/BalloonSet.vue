<template>
  <div class = 'vb-set'>
    <transition name = 'vb-transition'>
      <div class = 'vb-set-maximized' v-if = 'maximizedBalloon' ref = 'maximized'>
        <balloon
          v-bind = 'maximizedBalloon'
          :balloonState = 'balloonState'
          :balloon = 'maximizedBalloon'
          :position = 'null'
          :key = 'maximizedBalloon.key'
        >
          <slot v-bind = 'maximizedBalloon'></slot>
        </balloon>
      </div>
    </transition>

    <div :class = 'classes'>
      <balloon
        v-for = 'balloon in balloons'
        v-bind = 'balloon'
        v-show = 'balloon !== maximizedBalloon || dockKeepMaximized'
        :key = 'balloon.key'
        :balloonState = 'balloonState'
        :balloon = 'balloon'
        :position = 'null'
        :force-minimized = 'true'
        v-on = 'balloon.on'
        class = 'vb-multiple'
      >
        <slot v-bind = 'balloon'></slot>
      </balloon>
    </div>
  </div>
</template>

<script>
  import Balloon from './Balloon'

  export default {
    data () {
      return {
        balloonState: {
          maximized: null
        }
      }
    },

    components: {
      Balloon
    },

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
    },

    computed: {
      classes () {
        return [
          'vb-set-minimized',
          `vb-${this.position}`,
          this.dockBringToFront ? 'vb-front' : ''
        ]
      },

      minimizedBalloons () {
        return this.balloons.filter(b => b !== this.maximizedBalloon)
      },

      maximizedBalloon () {
        return this.balloonState.maximized
      }
    }
  }
</script>
