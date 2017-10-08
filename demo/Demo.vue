<template>
  <div id = 'demo'>
    <!-- load font awesome dependency -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <balloon
      title = 'One Cute Cat'
      position = 'bottom-right'
      @maximize = 'playVideo'
      @minimize = 'pauseVideo'
    >
      <youtube :video-id = 'videoId' ref = 'player'>
      </youtube>
    </balloon>
  </div>
</template>

<script>
  import { Balloon } from '../src/index'

  export default {
    components: {
      Balloon
    },

    data () {
      return {
        videoId: '0Bmhjf0rKe8'
      }
    },

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
