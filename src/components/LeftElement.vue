<script lang="ts" setup>
import SkeletonLoading from './UI/SkeletonLoading.vue'
</script>

<template>
  <div class="left-element flex flex-col align-center">
    <div class="left-element__img">
      <img src="../assets/images/blurred-img.png" alt="" width="208" height="240" />
    </div>
    <div class="left-element__title">
      <SkeletonLoading type="block" />
    </div>
    <div class="left-element__text">
      <SkeletonLoading
        type="text"
        :lines="5"
        :lines-widths="['155px', '190px', '170px', '160px', '140px']"
      />
    </div>
    <div class="left-element__action">
      <SkeletonLoading type="text" :lines="1" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$b: '.left-element';

#{$b} {
  width: 230px;
  padding-block: 18px;
  padding-inline: 14px;
  border: var(--border);
  border-radius: var(--border-radius-large);
  background-color: var(--color-gray-1);

  &__img {
    overflow: hidden;
    border-radius: var(--border-radius-default);

    & img {
      filter: blur(5px);
    }
  }

  &__title {
    margin-top: 20px;
    width: 190px;
    height: 26px;
  }

  &__text {
    margin-top: 24px;
    width: 100%;
  }

  &__action {
    margin-top: 24px;
    width: 80px;
  }
}
</style>
