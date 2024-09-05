import { defineStore } from "pinia"

import { ref } from "vue"

import { v4 as uuidv4 } from 'uuid';

import axios from 'axios'

export const useTodoStore = defineStore("todo", () => {
    const todos = ref([])

    const addTodo = (text) => {
        todos.value.push({ id: uuidv4(), text, completed: false })
    }

    const toggleTodo = (index) => {
        todos.value[index].completed = !todos.value[index].completed
    }

    const removeTodo = (index) => {
        const todo = todos.value.findIndex((todo) => todo.id == index)
        if (todo !== -1) todos.value.splice(todo, 1)
    }

    const fetchTodos = async() => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            todos.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    return { todos, fetchTodos, addTodo, toggleTodo, removeTodo }
})