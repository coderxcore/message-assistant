<template>
  <list-panel class="HomeBody" selectable>
    <template #header>
    </template>
    <li
        v-if="message.previewMessages.length"
        v-for="msg in message.previewMessages"
        class="preview-message"
        @click="fullInput(msg)"
    >
      <span v-for="part in msg.parts" :class="PartType[part.type]">
        {{ part.text }}
      </span>
    </li>
    <li
        v-else v-for="msg in message.messages" :key="msg.id"
        @click="message.toPreviewMessage(msg)"
        class="btn-row"
    >
      <span>{{ msg.text }}</span>
      <button @click.stop="message.remove(msg)">&times;</button>
    </li>
  </list-panel>
</template>

<script lang="ts" setup>
import ListPanel from "../../part/ListPanel.vue";
import {Store} from '../../store'
import {IMessagePreview, PartType} from "../../type";

const {locale, message} = Store;

function fullInput(msg: IMessagePreview) {
  message.previewMessages.length = 0;
  message.query.text = msg.parts.map(({text}) => text).join('');
  message.terms.length = 0;
}

</script>
