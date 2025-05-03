<template>

  <header class="h-[55px] flex items-center justify-center bg-black">
    <div class="text-sm tracking-wide text-gray9">This site is still in early <span class="text-white">alpha.</span></div>
  </header>

  <div class="line-x"></div>

  <nav class="h-[55px] bg-black flex flex-row justify-between items-center px-10">
    <div class="flex flex-row items-center gap-10">
      <div class="text-lg font-semibold text-gray-300">definitive-os</div>
      <div class="line-y h-[55px] md:flex hidden"></div>
      <div class="md:flex hidden flex-row gap-5">
        <a href="https://github.com/mustbeperfect/definitive-opensource/blob/main/.github/GUIDELINES.md" class="nav-item">Submit</a>
        <a href="https://github.com/mustbeperfect/definitive-opensource/blob/main/.github/CONTRIBUTING.md" class="nav-item">Contributing</a>
        <a href="https://github.com/mustbeperfect/definitive-opensource/blob/main/.github/SECURITY.md" class="nav-item">Security</a>
        <a href="https://github.com/mustbeperfect/definitive-opensource/blob/main/resources/dev/BACKLOG.md" class="nav-item">Backlog</a>
      </div>
    </div>
    <div class="md:flex hidden items-center gap-4">
      <i class="bi bi-discord nav-item"></i>
      <i class="bi bi-search nav-item"></i>
      <a class="sm-button-outline">Log In</a>
      <a class="sm-button-fill">Sign Up</a>
    </div>
  </nav>

  <div class="line-x"></div>

  <div class="bg-black flex flex-col py-20 items-center justify-center gap-6 px-4">
    <div class="border border-gray2 rounded-md py-2 px-3 flex flex-row gap-2 items-center justify-center">
      <div class="rounded-full size-2 bg-green-500"></div>
      <div class="text-xs font-medium text-gray-300">Updated Today</div>
    </div>
    <div class="text-gray-200 font-bold text-5xl text-center">Your Gateway to Open Source</div>
    <div class="text-gray9 text-xl tracking-wide text-center">A tool to find the best open source software.</div>
    <div class="flex flex-row gap-3">
      <a href="https://github.com/mustbeperfect/definitive-opensource/blob/main/resources/PORTAL.md" class="button-hybrid">Portal</a>
      <a href="https://github.com/mustbeperfect/definitive-opensource" class="button-outline gap-2">
        <i class="bi bi-github"></i>
        <div>GitHub</div>
      </a>
    </div>
  </div>

  <main class="flex items-center justify-center bg-black px-4">
    <div class="w-5xl bg-black flex gap-5">

      <FiltersSidebar
          :categories="categories"
          :applications="applications"
          :subcategories="subcategories"
          :platforms="platforms"
          :licenses="licenses"
          :tags="tags"
          :loading="loading"
          :error="error"
          @filter="handleFilter"
      />

      <div class="flex flex-col gap-5 md:w-[calc(100%-276px)] w-full">
        <div class="flex gap-3 w-full">
          <input type="text" v-model="searchText" class="border-gray2 border text-gray7 text-sm px-6 h-10 placeholder-gray7 rounded-lg focus:outline-none w-full" placeholder="Search">
          <div class="relative">
            <div @click="toggleSortDropdown" class="hybrid text-gray7 flex justify-between px-5 h-10 w-50 rounded-lg items-center cursor-pointer">
              <div class="text-sm">{{ getSortLabel(sortOption) }}</div>
              <i class="bi" :class="showSortDropdown ? 'bi-arrows-collapse' : 'bi-arrows-expand'"></i>
            </div>
            <div v-if="showSortDropdown" class="absolute top-full right-0 mt-1 w-48 bg-gray-800 border border-gray2 rounded-lg shadow-lg z-10">
              <div @click="setSortOption('stars')" class="px-4 py-2 text-sm text-gray7 hover:bg-gray-700 cursor-pointer rounded-t-lg" :class="{ 'bg-gray-700': sortOption === 'stars' }">
                Most Stars
              </div>
              <div @click="setSortOption('name_asc')" class="px-4 py-2 text-sm text-gray7 hover:bg-gray-700 cursor-pointer" :class="{ 'bg-gray-700': sortOption === 'name_asc' }">
                A-Z
              </div>
              <div @click="setSortOption('name_desc')" class="px-4 py-2 text-sm text-gray7 hover:bg-gray-700 cursor-pointer" :class="{ 'bg-gray-700': sortOption === 'name_desc' }">
                Z-A
              </div>
              <div @click="setSortOption('updated')" class="px-4 py-2 text-sm text-gray7 hover:bg-gray-700 cursor-pointer rounded-b-lg" :class="{ 'bg-gray-700': sortOption === 'updated' }">
                Recently Updated
              </div>
            </div>
          </div>
        </div>
        <ApplicationsList
            :applications="applications"
            :subcategories="subcategories"
            :selectedCategoryId="selectedCategoryId"
            :selectedSubcategoryId="selectedSubcategoryId"
            :selectedPlatformId="selectedPlatformId"
            :selectedLicenseId="selectedLicenseId"
            :selectedTagId="selectedTagId"
            :searchText="searchText"
            :sortOption="sortOption"
            :getTagEmoji="getTagEmoji"
            :loading="loading"
            :error="error"
            :tagsMap="tagsMap"
        />
      </div>
    </div>
  </main>

  <div class="line-x"></div>

  <footer class="h-[55px] flex items-center justify-center bg-black">
    <div class="text-sm tracking-wide text-gray9">Built with <span class="text-white">Nuxt</span>. Data retrieved from the <span class="text-white">definitive-opensource</span> project.</div>
  </footer>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useData } from '~/src/lib/useApplications';
import ApplicationsList from "~/src/components/ApplicationsList.vue";
import FiltersSidebar from "~/src/components/FiltersSidebar.vue";

const {
  applications,
  categories,
  subcategories,
  platforms,
  licenses,
  tags,
  loading,
  error,
  fetchData,
  getTagEmoji,
  tagsMap
} = useData();

const selectedCategoryId = ref<string[]>([]);
const selectedSubcategoryId = ref<string[]>([]);
const selectedPlatformId = ref<string[]>([]);
const selectedLicenseId = ref<string[]>([]);
const selectedTagId = ref<string[]>([]);
const searchText = ref<string>('');
const sortOption = ref<string>('stars');
const showSortDropdown = ref<boolean>(false);

const handleFilter = (categoryIds: string[], subcategoryIds: string[], platformIds: string[], licenseIds: string[], tagIds: string[]) => {
  selectedCategoryId.value = categoryIds;
  selectedSubcategoryId.value = subcategoryIds;
  selectedPlatformId.value = platformIds;
  selectedLicenseId.value = licenseIds;
  selectedTagId.value = tagIds;
};

const toggleSortDropdown = () => {
  showSortDropdown.value = !showSortDropdown.value;
};

const setSortOption = (option: string) => {
  sortOption.value = option;
  showSortDropdown.value = false;
};

const getSortLabel = (option: string): string => {
  switch (option) {
    case 'stars': return 'Most Stars';
    case 'name_asc': return 'A-Z';
    case 'name_desc': return 'Z-A';
    case 'updated': return 'Recently Updated';
    default: return 'Order';
  }
};

onMounted(() => {
  fetchData();
});
</script>
