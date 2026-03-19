<template>
  <div class="w-full flex flex-col sm:flex-row gap-6 justify-center items-start">
    <div class="w-full sm:w-40 flex flex-col items-center">
      <FileButton/>
    </div>
    <div class="w-full sm:w-40 flex flex-col items-center">
      <ReadPaste/>
    </div>
  </div>
</template>

<script setup>
import FileButton  from './FileButton.vue'
import  ReadPaste  from './ReadPaste.vue'
</script>
