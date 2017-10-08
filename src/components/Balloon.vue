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
            v-if = 'concise && !maximized'
            @click = 'concise = false'
          ></i>
          <i
            class = 'fa fa-chevron-down'
            aria-hidden = 'true'
            v-if = '!concise && !maximized'
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
            v-if = '!maximized'
            @click = 'close'
          ></i>
        </div>
      </div>
      <div class = 'vb-content'>
        <slot></slot>
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
      title: {
        default: ''
      },

      position: {
        default: 'bottom-right'
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
          this.maximized ? 'vb-maximized' : ''
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
