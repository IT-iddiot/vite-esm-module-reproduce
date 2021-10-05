<template>
    <div style="margin: 20px auto">
        <h4>
            Updated title:
            <span style="color: blue">{{ $store.state.title }}</span>
        </h4>
        <h4>
            Updated description:
            <span style="color: blue">{{ $store.state.description }}</span>
        </h4>
    </div>
</template>

<script setup>
/**
 * Composition API
 */
import { useStore } from "vuex";

/**
 * All the code inside <script setup> will run around
 * the beforeCreate and created lifecycle hooks, unless
 * you explicitly wrap the code under other lifecycle.
 * Refer: https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html#lifecycle-hooks
 */
const store = useStore();

store.commit("setMetaInfo", {
    title: "Custom title",
    description: "Custom description",
});
</script>


// <script>
// /**
//  * Option API
//  */
// export default {
//   created() {
//     this.$store.commit('setMetaInfo', {
//       title: "custom title",
//       description: "custom description",
//     })
//   },
// }
// </script>
