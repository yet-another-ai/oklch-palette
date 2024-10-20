<script setup lang="ts">
import { defineProps, computed } from 'vue'

import Color from 'colorjs.io'

const props = defineProps<{
  lightness: number
  chroma: number
  hue: number
}>()

const targetColor = computed(() => {
  return new Color('oklch', [props.lightness, props.chroma, props.hue]).to('srgb')
})

const targetColorString = computed(() => {
  return targetColor.value.toString()
})

// show boarder in red if the color is out of gamut
const targetColorBoarder = computed(() => {
  return targetColor.value.inGamut() ? '' : '0 0 0 2px #f00 inset'
})

</script>

<template lang="pug">
.color-preview
</template>

<style lang="stylus" scoped>
.color-preview
  background-color v-bind(targetColorString)
  box-shadow v-bind(targetColorBoarder)
</style>
