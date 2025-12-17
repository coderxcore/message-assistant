<template>
  <router-view/>
</template>

<script lang="ts" setup>
import {Store} from "../../src-page";
import {onMounted} from "vue";

onMounted(async () => {
  await Store.locale.loadMessages();
})
</script>

