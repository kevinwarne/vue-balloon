<template>
  <transition name = 'vb-transition'>
    <div class = 'vb-wrapper' v-if = '!closed'>
      <div :class = 'classes'>
        <div class = 'vb-header'>
          <div class = 'vb-title' @click = 'maximize'>{{ title }}</div>
          <div class = 'vb-buttons'>
            <i
              class = 'fa fa-chevron-up'
              aria-hidden = 'true'
              v-if = 'concise && !maximized && !hideConciseButton'
              @click = 'concise = false'
            ></i>
            <i
              class = 'fa fa-chevron-down'
              aria-hidden = 'true'
              v-if = '!concise && !maximized && !hideConciseButton'
              @click = 'concise = true'
            ></i>
            <i
              class = 'fa fa-compress'
              aria-hidden = 'true'
              v-if = 'maximized'
              @click = 'minimize'
            ></i>
            <i
              class = 'fa fa-close'
              aria-hidden = 'true'
              v-if = '(showCloseWhenMaximized || !maximized) && !hideCloseButton'
              @click = 'close'
            ></i>
          </div>
        </div>
        <div class = 'vb-content'>
          <div class = 'vb-content-slot'><slot></slot></div>
          <div
            class = 'vb-minimized-overlay'
            v-if = '!maximized'
            @click = 'maximize'
          >
            <i class = 'fa fa-expand' aria-hidden = 'true'></i>
          </div>
        </div>
      </div>
      <transition name = 'vb-transition'>
        <div
          class = 'vb-maximized-overlay'
          v-if = 'maximized'
          @click = 'minimize'
        >
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
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
      },

      // when balloon is created it will have this initial 'concise' state
      initiallyConcise: {
        default: false,
        type: Boolean
      },

      // when balloon is maximized, it will still have the close button
      showCloseWhenMaximized: {
        default: false,
        type: Boolean
      },

      //* vb internal props *//

      // keep track of state with multiple balloons
      balloonState: {
        default () {
          return {
            maximized: null
          }
        },
        type: Object
      },

      // remember the original balloon object to store in the balloon state
      balloon: {
        default () {
          return { }
        },
        type: Object
      },

      // force the minimized state, used in the balloon set dock
      forceMinimized: {
        default: false,
        type: Boolean
      }
    },

    data () {
      return {
        concise: this.initiallyConcise,
        closed: false
      }
    },

    watch: {
      'balloonState.maximized' (n, o) {
        // if maximized balloon changed from this one trigger a minimize event
        if (o === this.balloon && n !== this.balloon) {
          this.$emit('minimize', this)
        // else if maximized balloon changed to this one trigger a maximize event
        } else if (o !== this.balloon && n === this.balloon) {
          this.$emit('maximize', this)
        }
      }
    },

    computed: {
      classes () {
        return [
          'vb',
          this.position ? `vb-${this.position}` : '',
          this.concise ? 'vb-concise' : '',
          this.maximized ? 'vb-maximized' : '',
          !this.maximized && this.zooming ? 'vb-zoomed-out' : ''
        ]
      },

      maximized () {
        return this.balloonState.maximized === this.balloon && !this.forceMinimized
      }
    },

    methods: {
      close () {
        this.closed = true
        this.$emit('close', this)
      },

      open () {
        this.closed = false
        this.$emit('open', this)
      },

      maximize () {
        this.balloonState.maximized = this.balloon
      },

      minimize () {
        this.balloonState.maximized = null
      }
    }
  }
</script>
