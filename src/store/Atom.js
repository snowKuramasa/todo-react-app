import { atom } from 'recoil'

export const todoListAtom = atom({
  key: 'todosAtom',
  default: localStorage.getItem('todoList')
    ? JSON.parse(localStorage.getItem('todoList'))
    : [],
})

export const targetIdAtom = atom({
  key: 'targetIdAtom',
  default: null,
})
