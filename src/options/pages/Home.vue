<template>
  <div class="Home">
    <button @click="btnClick">有东西</button>
  </div>
</template>

<script lang="ts" setup>
import {Api, Store} from "/src-page";

async function btnClick() {
  console.log(Store.locale);
  console.log(Store.locale.title);
}

</script>