<template>
  <transition name="b-fade">
    <div v-show="show" class="set-x-y">
      <div class="empty">
        <slot ></slot>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "Shuck",
        props:{
            show:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped>
  .b-fade-enter-active{
    transition: opacity 1s ease;
  }

  .b-fade-leave-active{
    /*transition: opacity 0ms ease;*/
  }
  .b-fade-enter, .b-fade-leave-to /* .b-fade-leave-active below version 2.1.8 */
  {

    opacity: 0;
  }
</style>
