<template>
  <list-panel class="HomeBody" selectable >
    <template #header>
    </template>
    <li v-if="message.input" v-for="msg in message.searchMessages" :key="msg.id">
      {{ msg.text }}
    </li>
    <li v-else v-for="msg in message.lastMessages" :key="msg.id">
      {{ msg.text }}
    </li>
  </list-panel>
</template>

<script lang="ts" setup>
import ListPanel from "../../part/ListPanel.vue";
import {Store} from '../../store'
import {onMounted} from "vue";

const {locale, message} = Store;

onMounted(async () => {
  await message.loadMessage();
})

</script>
