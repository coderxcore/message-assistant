<template>
  <section class="ListPanel" :class="{selectable,'header-sticky':headerSticky}">
    <header>
      <slot name="header"></slot>
    </header>
    <component :is="body||'ul'">
      <slot></slot>
    </component>
    <slot name="footer"></slot>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  body?: 'ul' | 'div',
  selectable?: boolean
  headerSticky?: boolean
}>()
</script>
