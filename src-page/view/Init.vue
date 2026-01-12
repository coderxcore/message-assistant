<template>
  <div class="Init">
    <div class="overlay">
      <div class="container">
        <h2>{{ locale.initTitle }}</h2>
        <p>{{ locale.initSubtitle }}</p>

        <div class="content">
          <div class="section">
            <div class="header">
              <label>{{ locale.selectLanguage }}</label>
              <label class="select-all">
                <input type="checkbox" v-model="allLanguagesSelected">
                <span>{{ locale.selectAll }}</span>
              </label>
            </div>
            <div class="checkbox-group">
              <label v-for="lang in languages" :key="lang.value" class="checkbox-item">
                <input
                    type="checkbox"
                    :value="lang.value"
                    v-model="selectedLanguages"
                >
                <span class="checkbox-label">{{ lang.label }}</span>
              </label>
            </div>
          </div>

          <div v-for="lang in selectedLanguages" :key="lang" class="section">
            <div class="header">
              <label>{{ getLanguageLabel(lang) }} - {{ locale.selectCategory }}</label>
              <label class="select-all">
                <input type="checkbox" :checked="allCategoriesSelected[lang] || false"
                       @change="toggleSelectAllCategoriesForLanguage(lang)">
                <span>{{ locale.selectAll }}</span>
              </label>
            </div>
            <div class="checkbox-group">
              <label v-for="category in categories" :key="`${lang}-${category.value}`" class="checkbox-item">
                <input
                    type="checkbox"
                    :value="category.value"
                    :checked="(languageCategories[lang] || []).includes(category.value)"
                    @change="toggleCategory(lang, category.value)"
                >
                <span class="checkbox-label">{{ category.label }}</span>
              </label>
            </div>
          </div>

        </div>

        <div class="actions">
          <button class="secondary import-btn" @click="onImportCustomReference">
            {{ locale.importCustomReference }}
          </button>
          <div class="button-group">
            <button class="secondary" @click="onCancel">
              {{ locale.cancel }}
            </button>
            <button class="primary" @click="onConfirm">
              {{ locale.ok }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Store} from "../store";
import {ref, computed, watch} from "vue";

const {locale, settings} = Store;


// Language options
const languages = [
  {value: 'zh-CN', label: locale['zh-CN']},
  {value: 'zh-TW', label: locale['zh-TW']},
  {value: 'en', label: locale.en},
  {value: 'ja', label: locale.ja}
];

// Category options with formal internationalization support
const categories = [
  {value: 'ai_prompts', label: locale.ai_prompts},
  {value: 'ecommerce', label: locale.ecommerce},
  {value: 'general', label: locale.general},
  {value: 'movie', label: locale.movie},
  {value: 'social', label: locale.social}
];

// Selected languages
const selectedLanguages = ref<string[]>([Store.settings.language || 'zh-CN']);

// Categories per language
const languageCategories = ref<Record<string, string[]>>({});

// All categories selected state per language
const allCategoriesSelected = ref<Record<string, boolean>>({});

// Update allCategoriesSelected state for a specific language
const updateAllCategoriesSelectedState = (language: string) => {
  if (!languageCategories.value[language]) {
    languageCategories.value[language] = [];
  }
  const selected = languageCategories.value[language] || [];
  allCategoriesSelected.value[language] = selected.length === categories.length && selected.length > 0;
};

// Initialize language categories with all categories for selected languages
selectedLanguages.value.forEach(lang => {
  languageCategories.value[lang] = categories.map(category => category.value);
  updateAllCategoriesSelectedState(lang);
});

// Get language label
const getLanguageLabel = (lang: string) => {
  const language = languages.find(l => l.value === lang);
  return language ? language.label : lang;
};

// Watch selectedLanguages to update allCategoriesSelected state
watch(selectedLanguages, (newLanguages, oldLanguages) => {
  // Update allCategoriesSelected state for new languages
  newLanguages.forEach(lang => {
    if (!oldLanguages.includes(lang)) {
      // Auto-select all categories for newly selected language
      languageCategories.value[lang] = categories.map(category => category.value);
      updateAllCategoriesSelectedState(lang);
    }
  });
  console.log('Language selection changed:', newLanguages);
}, { deep: true });

// Toggle category selection for a specific language
const toggleCategory = (language: string, category: string) => {
  if (!languageCategories.value[language]) {
    languageCategories.value[language] = [];
  }
  const index = languageCategories.value[language].indexOf(category);
  if (index > -1) {
    languageCategories.value[language].splice(index, 1);
  } else {
    languageCategories.value[language].push(category);
  }
  updateAllCategoriesSelectedState(language);
};

// Watch languageCategories to update allCategoriesSelected state
watch(languageCategories, (newCategories, oldCategories) => {
  // Update allCategoriesSelected state for each language
  Object.keys(newCategories).forEach(lang => {
    updateAllCategoriesSelectedState(lang);
  });
}, {deep: true});

// Computed property for select all languages checkbox
const allLanguagesSelected = computed({
  get: () => selectedLanguages.value.length === languages.length && selectedLanguages.value.length > 0,
  set: (value) => toggleSelectAllLanguages(value)
});

// Toggle select all languages
const toggleSelectAllLanguages = (value?: boolean) => {
  const newValue = value ?? (selectedLanguages.value.length < languages.length);
  selectedLanguages.value = newValue ? languages.map(lang => lang.value) : [];
};

// Toggle select all categories for a specific language
const toggleSelectAllCategoriesForLanguage = (language: string) => {
  if (!languageCategories.value[language]) {
    languageCategories.value[language] = [];
  }
  const currentState = allCategoriesSelected.value[language] || false;
  const newValue = !currentState;
  languageCategories.value[language] = newValue ? categories.map(category => category.value) : [];
  allCategoriesSelected.value[language] = newValue;
};

// Import custom reference handler
const onImportCustomReference = () => {
  // TODO: Implement import custom reference logic
  console.log('Import custom reference clicked');
};

// Confirm button handler
const onConfirm = () => {
  // TODO: Implement confirm logic
  console.log('Confirm clicked with selections:', {
    languages: selectedLanguages.value,
    languageCategories: languageCategories.value
  });
};

// Cancel button handler
const onCancel = () => {
  // TODO: Implement cancel logic
  console.log('Cancel clicked');
};
</script>
