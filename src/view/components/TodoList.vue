<template>
  <div>
    <h1>Todo List</h1>
    <input
      type="text"
      v-model="text"
      @keyup.enter="addTodo"
      placeholder="Add a new todo"
    />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
          {{ todo.title }}</span
        >
        <button @click="removeTodo(todo.id)">Remove</button>
        <button @click="toggleTodo(todo.id)">Toggle</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios'
import {onMounted, ref, watch } from "vue";
import { useTodoStore } from "../stores/todoStore.js";
const todoStore = useTodoStore();

const text = ref("");

const addTodo = () => {
  if (text.value.trim()) {
    todoStore.addTodo(text.value);
    text.value = "";
  }
};

const toggleTodo = (index) => {
  const todo = todos.value.find(todo => todo.id == index)

  if (todo) {
    todo.completed = !todo.completed;
  }
};

const removeTodo = (index) => {
  todoStore.removeTodo(index);
};

const todos = ref([]);

onMounted(() => {
    todoStore.fetchTodos()
})

watch(() => todoStore.todos, (newTodos) => {
    todos.value = newTodos
})

</script>

<style></style>
