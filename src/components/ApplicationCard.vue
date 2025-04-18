
<template>
  <div class="hybrid rounded-lg">

    <div class="flex justify-between px-5 py-4 items-center">
      <a :href="application.homepage_url" target="_blank" class="text-gray-200 font-semibold text-lg">{{ application.name }}</a>
      <div v-if="application.tags.length" class="flex gap-2">
        <span
            v-for="tagId in application.tags"
            :key="tagId"
            class="tag-emoji"
        >
          {{ getTagEmoji(tagId) }}
        </span>
      </div>
    </div>

    <div class="text-gray9 text-sm px-5 h-[62px] overflow-y-auto mb-4">{{ application.description }}</div>
    <div class="flex justify-between px-5 pb-4">
      <div class="text-sm text-green-400">Updated: {{ application.last_commit }}</div>
      <div class="flex text-sm text-gray8 gap-2">
        <div v-if="application.platforms.includes('Cross')" class="flex gap-2">
          <i class="bi bi-microsoft"></i>
          <i class="bi bi-apple"></i>
          <i class="bi bi-ubuntu"></i>
        </div>
        <div v-if="application.platforms.includes('Windows')">
          <i class="bi bi-microsoft"></i>
        </div>
        <div v-if="application.platforms.includes('MacOS')">
          <i class="bi bi-apple"></i>
        </div>
        <div v-if="application.platforms.includes('Linux')">
          <i class="bi bi-ubuntu"></i>
        </div>
        <div v-if="application.platforms.includes('SelfHost')">
          <i class="bi bi-hdd-rack"></i>
        </div>
      </div>
    </div>

    <div class="line-x"></div>

    <div class="flex justify-between px-5 py-3 text-sm text-gray8">
      <div class="flex gap-3 items-center">
        <span
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: getLanguageColor(application.language) }"
        ></span>
        <div class="">{{ application.language }}</div>
      </div>
      <div class="flex gap-2 items-center">
        <div class="">{{ application.license }}</div>
      </div>
      <div class="flex gap-1 items-center">
        <i class="bi bi-star"></i>
        <div class="">{{ application.stars }}</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Application } from '~/src/types/Application';
import { getLanguageColor } from '~/src/utils/languageColors';


const props = defineProps<{
  language: string;
  getTagEmoji: (tagId: string) => string;
  application: Application;
}>();

const languageColor = computed(() => {
  return getLanguageColor(props.language);
});

</script>