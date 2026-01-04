<template>
  <div class="References">
    <header class="flex-right">
      <icon-btn @click="Store.importReferences.selectFile()">
        <file-down :size="14"/>
        {{ Store.locale.importReferences}}
      </icon-btn>
    </header>
  </div>
</template>

<script lang="ts" setup>
import IconBtn from "../part/IconBtn.vue";
import {FileDown} from 'lucide-vue-next'
import {Store} from "../store";
</script>
