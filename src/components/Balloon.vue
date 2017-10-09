<template>
  <div class = 'vb-wrapper'>
    <div
      :class = 'classes'
      v-if = '!closed'
    >
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
            v-if = '!maximized && !hideCloseButton'
            @click = 'close'
          ></i>
        </div>
      </div>
      <div class = 'vb-content'>
        <div class = 'vb-content-slot'>
          <slot></slot>
        </div>
        <transition name = 'vb-overlay'>
          <div
            class = 'vb-minimized-overlay'
            v-if = '!maximized'
            @click = 'maximize'
          >
            <i class = 'fa fa-expand' aria-hidden = 'true'></i>
          </div>
        </transition>
      </div>
    </div>
    <transition name = 'vb-overlay'>
      <div
        class = 'vb-maximized-overlay'
        v-if = 'maximized'
        @click = 'minimize'
      >
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
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
    },

    data () {
      return {
        concise: false,
        maximized: false,
        closed: false
      }
    },

    computed: {
      classes () {
        return [
          'vb',
          `vb-${this.position}`,
          this.concise ? 'vb-concise' : '',
          this.maximized ? 'vb-maximized' : '',
          !this.maximized && this.zooming ? 'vb-zoomed-out' : ''
        ]
      }
    },

    methods: {
      close () {
        this.closed = true
      },

      open () {
        this.closed = false
      },

      maximize () {
        this.maximized = true
        this.$emit('maximize')
      },

      minimize () {
        this.maximized = false
        this.$emit('minimize')
      }
    }
  }
</script>
