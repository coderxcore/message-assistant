<template>
  <div class="EmojiSelector"
       @mousemove="timer.cancel()">
    <button class="btn-lg" @click.stop="mouseenter">
      <smile/>
    </button>
    <emoji-picker
        v-if="showEmojiPicker"
        @select="emit('select', $event)"
        @mouseleave="mouseout"
    />
  </div>
</template>

<script lang="ts" setup>
import {Smile} from 'lucide-vue-next';
import {onMounted, onUnmounted, ref} from "vue";
import EmojiPicker from "./EmojiPicker.vue";
import {Timer} from "gs-base";

const showEmojiPicker = ref(false);

const emit = defineEmits(['select']);

const timer = new Timer(600)

function mouseenter() {
  timer.cancel();
  showEmojiPicker.value = true;
}

async function mouseout() {
  await timer.wait()
  showEmojiPicker.value = false;
}

const closeEmoji = () => showEmojiPicker.value = false;
onMounted(() => document.addEventListener('click', closeEmoji));
onUnmounted(() => document.removeEventListener('click', closeEmoji));
</script>
