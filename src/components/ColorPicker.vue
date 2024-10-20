<script setup lang="ts">
import ColorViewer from './ColorViewer.vue'
import ColorPreview from './ColorPreview.vue'

const props = defineProps<{
  lightness: number
  chroma: number
  hue: number
}>()

const emits = defineEmits({
  update: (value: [number, number, number]) => true
})
</script>

<template lang="pug">
t-card.color-card
  t-form.color-form
    t-form-item(label="Lightness", name="lightness")
      .color-picker
        color-viewer.color-viewer(
          :lightness="props.lightness",
          :chroma="props.chroma",
          :hue="props.hue",
          :mode="'lightness'"
        )
        t-slider.color-slider(
          :min="0",
          :max="1",
          :step="0.01",
          :value="props.lightness",
          @change="(value) => emits('update', [value, props.chroma, props.hue])"
        )
    t-form-item(label="Chroma", name="chroma")
      .color-picker
        color-viewer.color-viewer(
          :lightness="props.lightness",
          :chroma="props.chroma",
          :hue="props.hue",
          :mode="'chroma'"
        )
        t-slider.color-slider(
          :min="0",
          :max="0.40",
          :step="0.01",
          :value="props.chroma",
          @change="(value) => emits('update', [props.lightness, value, props.hue])"
        )
    t-form-item(label="Hue", name="hue")
      .color-picker
        color-viewer.color-viewer(
          :lightness="props.lightness",
          :chroma="props.chroma",
          :hue="props.hue",
          :mode="'hue'"
        )
        t-slider.color-slider(
          :min="0",
          :max="360",
          :step="0.1",
          :value="props.hue",
          @change="(value) => emits('update', [props.lightness, props.chroma, value])"
        )
    t-form-item(label="Preview", name="preview")
      color-preview.color-preview(:lightness="props.lightness", :chroma="props.chroma", :hue="props.hue")
</template>

<style lang="stylus" scoped>
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
.color-preview
  width 100%
  height 100px
  border-radius 5px
</style>
