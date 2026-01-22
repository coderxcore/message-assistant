<template>
  <section class="ListPanel" :class="{selectable,'header-sticky':headerSticky}">
    <header>
      <slot name="header"></slot>
    </header>
    <component :is="body||'ul'">
      <slot></slot>
    </component>
    <footer v-if="slots.footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import {useSlots} from "vue";

defineProps<{
  body?: 'ul' | 'div',
  selectable?: boolean
  headerSticky?: boolean
}>()

const slots = useSlots()

</script>
