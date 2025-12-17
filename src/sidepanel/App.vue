<template>
  <button @click="toOptions">打开选项</button>
</template>

<script lang="ts" setup>
function toOptions() {
  chrome.runtime.openOptionsPage();
}
</script>


