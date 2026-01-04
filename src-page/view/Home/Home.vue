<template>
  <div class="Home container">
    <header>
      <nav>
        <router-link v-if="message.status.draftCount > 0" to="/draft" :title="locale.draft">
          <file-text/>
        </router-link>
        <router-link to="/history" :title="locale.history">
          <history/>
        </router-link>
        <router-link v-if="message.status.historyCount" to="/trash" :title="locale.trash">
          <trash/>
        </router-link>
        <div class="space"></div>
        <router-link v-if="message.status.referencesCount" to="/references" :title="locale.references">
          <book-open/>
        </router-link>
        <a v-else @click="Store.importReferences.selectFile()" :title="locale.importReferences">
          <file-down/>
        </a>
        <router-link to="/settings" :title="locale.settings">
          <settings/>
        </router-link>
      </nav>
      <home-input/>
    </header>
  </div>
</template>

<script lang="ts" setup>
import {Settings, FileText, History, BookOpen, Trash, FileDown} from 'lucide-vue-next';
import {Store} from '../../store'
import HomeInput from "./HomeInput.vue";

const {locale, message} = Store;
</script>
