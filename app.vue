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
      <div class="w-3xs hybrid rounded-lg h-full sticky top-5 hidden md:flex md:flex-col">
        <div class="px-3 py-2 text-gray9 text-xs font-medium">Categories</div>
        <div class="line-x"></div>
        <div class="flex flex-col p-3 gap-2">
          <CategorySidebar
              :categories="categories"
              :subcategories="subcategories"
              :loading="loading"
              :error="error"
              @filter="handleFilter"
          />
        </div>
      </div>
      <div class="flex flex-col gap-5 md:w-[calc(100%-276px)] w-full">
        <div class="flex gap-3 w-full">
          <input type="text" id="first_name" class="border-gray2 border text-gray7 text-sm px-6 h-10 placeholder-gray7 rounded-lg focus:outline-none w-full" placeholder="Search">
          <div class="hybrid text-gray7 flex justify-between px-5 h-10 w-50 rounded-lg items-center">
            <div class="text-sm">Order</div>
            <i class="bi bi-arrows-expand"></i>
          </div>
        </div>
        <ApplicationsList
            :applications="applications"
            :selectedCategoryId="selectedCategoryId"
            :selectedSubcategoryId="selectedSubcategoryId"
            :getTagEmoji="getTagEmoji"
            :loading="loading"
            :error="error"
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
import CategorySidebar from "~/src/components/CategorySidebar.vue";

const {
  applications,
  categories,
  subcategories,
  loading,
  error,
  fetchData,
  getTagEmoji
} = useData();

const selectedCategoryId = ref<string | null>(null);
const selectedSubcategoryId = ref<string | null>(null);

const handleFilter = (categoryId: string | null, subcategoryId: string | null) => {
  selectedCategoryId.value = categoryId;
  selectedSubcategoryId.value = subcategoryId;
};

onMounted(() => {
  fetchData();
});
</script>
