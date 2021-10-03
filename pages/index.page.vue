<template>
  <h1>Page Context</h1>
  {{ $pageContext }}
  <h1>Issues</h1>
  <ol>
    <li v-for="item in todoList" :key="item.id">{{ item.text }}</li>
  </ol>
</template>

<script setup>
import { computed, onServerPrefetch  } from 'vue';
import { useStore } from 'vuex';
import { useMeta } from 'vue-meta'

  const store = useStore();

  const { meta } = useMeta({
    title: 'My Title',
  })

  console.log("meta", meta);

  onServerPrefetch(() => {
    return store.dispatch('fetchTodoList')
  })

  const todoList = computed(() => store.state.todoList)
</script>
