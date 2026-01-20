<template>
  <list-panel class=".MsgMgr" header-sticky>
    <template #header>
      <div class="space"></div>
      <icon-btn v-if="route==='references'" @click="Store.importReferences.selectFile()">
        <file-down :size="14"/>
        {{ locale.importReferences }}
      </icon-btn>
    </template>
    <li
        v-for="msg in msgMgr.msgs" :key="msg.id"
    >
      <section v-html="formatText(msg.text)"></section>
    </li>
  </list-panel>
</template>

<script lang="ts" setup>
import IconBtn from "../part/IconBtn.vue";
import {FileDown} from 'lucide-vue-next'
import {Store} from "../store";
import {computed, onUnmounted, watch} from "vue";
import {router} from "./index";
import ListPanel from "../part/ListPanel.vue";
import {formatText} from "../lib/formatText";

const {locale, msgMgr} = Store

const route = computed(() => router.currentRoute.value.name);

onUnmounted(() => msgMgr.clear())

watch(route, async (r: string) => {
  msgMgr.route = r;
  await msgMgr.loadData()
}, {immediate: true})

</script>
