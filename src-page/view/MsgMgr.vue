<template>
  <list-panel class=".MsgMgr">
    <template #header>
      <div class="space"></div>
      <icon-btn v-if="route==='references'" @click="Store.importReferences.selectFile()">
        <file-down :size="14"/>
        {{ locale.importReferences }}
      </icon-btn>
    </template>
  </list-panel>
</template>

<script lang="ts" setup>
import IconBtn from "../part/IconBtn.vue";
import {FileDown} from 'lucide-vue-next'
import {Store} from "../store";
import {computed} from "vue";
import {router} from "./index";
import ListPanel from "../part/ListPanel.vue";

const{locale} = Store

const route = computed(() => router.currentRoute.value.name);


</script>
