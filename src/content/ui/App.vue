<template>
  <link rel="stylesheet" :href="cssHref">
  <div id="message-assistant-app">
    <button>测试按钮</button>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {Store} from "/src-page/store";
import {Api} from "/src-page/api";

const cssHref = chrome.runtime.getURL('content-scripts/content.css')
onMounted(async () => {
  await Store.init.loadInitData();
  await Store.settings.loadSettings();
  await Store.locale.loadMessages();
  await Store.scene.loadScenes();
  await Api.data.preload();
})
</script>


