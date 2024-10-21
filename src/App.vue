<script setup lang="ts">
import { computed, ref, reactive } from 'vue'

import ColorPicker from './components/ColorPicker.vue'

const primaryColor = ref<[number, number, number]>([0.5, 0.2, 180])
const paletteParameters = reactive({
  hues: 2,
  ramp: 5,
  lightness: [0.2, 0.8],
})

const generatedPalette = computed(() => {
  // hues * ramp colors
  const palettes = []
  for (let i = 0; i < paletteParameters.hues; i++) {
    const palette = []

    let hue = 360 / paletteParameters.hues * i + primaryColor.value[2]
    while (hue > 360) { hue -= 360 }

    for (let j = 0; j < paletteParameters.ramp / 2 - 1; j++) {
      // lightness[0] to primary lightness
      const step = (primaryColor.value[0] - paletteParameters.lightness[0]) / (paletteParameters.ramp / 2)
      const lightness = paletteParameters.lightness[0] + step * j
      if (step > 0) {
        palette.push([lightness, primaryColor.value[1], hue])
      } else {
        palette.push([primaryColor.value[0], primaryColor.value[1], hue])
      }
    }

    palette.push([primaryColor.value[0], primaryColor.value[1], hue])

    for (let j = 1; j < paletteParameters.ramp / 2; j++) {
      // primary lightness to lightness[1]
      const step = (paletteParameters.lightness[1] - primaryColor.value[0]) / (paletteParameters.ramp / 2)
      const lightness = primaryColor.value[0] + step * j
      if (step > 0) {
        palette.push([lightness, primaryColor.value[1], hue])
      } else {
        palette.push([primaryColor.value[0], primaryColor.value[1], hue])
      }
    }

    palettes.push(palette)
  }

  console.log(generatedPalette)
  return palettes
})
</script>

<template lang="pug">
#app
  h1 OKLCH Color Palette Generator
  h2 Select Primary Color
  color-picker(:lightness="primaryColor[0]", :chroma="primaryColor[1]", :hue="primaryColor[2]", @update="(value) => primaryColor = value")
  h2 Select Color Palette Parameters
  t-card
    t-form
      t-form-item(label="Hues", name="hues")
        t-slider(:min="2", :max="4", :step="1", v-model="paletteParameters.hues")
      t-form-item(label="Ramp", name="ramp")
        t-slider(:min="3", :max="7", :step="2", v-model="paletteParameters.ramp")
      t-form-item(label="Lightness", name="lightness")
        t-slider(:min="0", :max="1", :step="0.01", range, v-model="paletteParameters.lightness")
  h2 Generated Palette
  t-card
    t-form
      t-form-item(v-for="(palette, index) in generatedPalette" :key="index" :label="'Palette ' + (index + 1)" :name="'palette' + index")
        color-preview.palette-preview(v-for="(color, colorIndex) in palette" :key="colorIndex" :lightness="color[0]" :chroma="color[1]" :hue="color[2]")
</template>

<style lang="stylus" scoped>
#app
  padding 20px
.color-form
  width 500px
.color-picker
  width 100%
  display block
.color-viewer
  width 100%
  height 20px
.color-slider
  padding 0
  margin 0
.palette-preview
  flex 1
  height 40px
</style>
