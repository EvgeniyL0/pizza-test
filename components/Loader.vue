<template>
  <div class="loader"></div>
</template>

<style lang="scss">
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader {
  width: 20px;
  height: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #d1d5db;
  border-radius: 100%;
  border-left-color: white;
  animation: rotation 1s linear infinite;
}
</style>