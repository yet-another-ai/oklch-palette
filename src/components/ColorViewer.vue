<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { defineProps, watch } from 'vue'

import Color from 'colorjs.io'
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  lightness: number
  chroma: number
  hue: number
  mode: 'lightness' | 'chroma' | 'hue'
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
const canvasSize = useElementSize(canvas)

const updateCanvas = () => {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvasSize.width.value, canvasSize.height.value)
  for (let i = 0; i < canvasSize.width.value; i++) {
    const colorValue = [props.lightness, props.chroma, props.hue]
    switch (props.mode) {
      case 'lightness':
        colorValue[0] = i / canvas.value.width // 0 to 1
        break;
      case 'chroma':
        colorValue[1] = i / canvas.value.width * 0.4 // 0 to 0.4
        break;
      case 'hue':
        colorValue[2] = i / canvas.value.width * 360 // 0 to 360
        break;
      default:
        throw new Error("Invalid mode");
        break;
    }
    const color = new Color('oklch', [colorValue[0], colorValue[1], colorValue[2]]).to('srgb')


    // the above 20px shows if it is in gamut
    ctx.fillStyle = color.inGamut() ? '#00ff00' : '#ff0000'
    ctx.fillRect(i, 0, 1, 20)
    // the remaining half shows the color
    ctx.fillStyle = color.toString()
    ctx.fillRect(i, 20, 1, canvas.value.height - 20)
  }
}

const stashCanvasUpdate = () => {
  requestAnimationFrame(updateCanvas)
}

onMounted(() => updateCanvas())
watch(() => [props.lightness, props.chroma, props.hue, props.mode, canvasSize.width, canvasSize.height], stashCanvasUpdate)
</script>

<template lang="pug">
canvas.color-viewer(ref="canvas")
</template>

<style lang="stylus" scoped>
</style>
