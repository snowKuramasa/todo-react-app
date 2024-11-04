import { selector } from 'recoil'
import { targetIdAtom, todoListAtom } from './Atom'

//get/setはuseRecoilStateで扱う処理をここで定義が可能？
export const todoListTotalSelector = selector({
  key: 'todoListTotalSelector',
  get: ({ get }) => {
    const todoList = get(todoListAtom)
    const totalNum = todoList.length
    return totalNum
  },
})

export const todoListSelector = selector({
  key: 'todoListSelector',
  get: ({ get }) => {
    const todoList = get(todoListAtom)
    return todoList
  },
  set: ({ set }, newValue) => {
    localStorage.setItem('todoList', JSON.stringify(newValue))
    set(todoListAtom, newValue)
  },
})

export const targetIdSelector = selector({
  key: 'targetIdSelector',
  get: ({ get }) => {
    const targetId = get(targetIdAtom)
    return targetId
  },
  set: ({ set }, newValue) => {
    set(targetIdAtom, newValue)
  },
})
