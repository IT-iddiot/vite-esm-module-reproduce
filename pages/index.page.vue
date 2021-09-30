<template>
  <h1>Page Context</h1>
  {{ $pageContext }}
  <h1>To-do List</h1>
  <ol>
    <li v-for="item in todoList" :key="item.id">{{ item.text }}</li>
  </ol>
</template>

<script setup>
import { computed, onServerPrefetch, getCurrentInstance, inject  } from 'vue';
import { useStore } from 'vuex';

  const store = useStore();
  const internalInstance = getCurrentInstance()

  //* global property
  // internalInstance.appContext.config.$pageContext.documentProps = {
  //   title: 'title',
  //   description: 'description',
  // }

  //* provide, inject
  // const pageContext = inject('pageContext');
  // pageContext.documentProps.title = 'foo';
  // pageContext.documentProps.description = 'bar';

  onServerPrefetch(() => {
    return store.dispatch('fetchTodoList')
  })

  const todoList = computed(() => store.state.todoList)
</script>
