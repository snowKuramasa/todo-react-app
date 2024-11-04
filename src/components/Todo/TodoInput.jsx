import {
  Text,
  Box,
  Button,
  ButtonGroup,
  Input,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { todoListSelector, todoListTotalSelector } from '../../store/Selector'

export default function TodoInput() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const totalTodo = useRecoilValue(todoListTotalSelector)
  const [todoList, setTodoList] = useRecoilState(todoListSelector)

  const [content, setContent] = useState('')
  const [deadLine, setDeadLine] = useState()

  const handleClear = () => {
    setContent('')
    setDeadLine('')
  }

  const handleSave = () => {
    setTodoList([
      ...todoList,
      {
        id: getId(),
        content: content,
        deadLine: deadLine,
        isDone: false,
      },
    ])
    handleClear()
    onClose()
  }

  const getId = () => {
    const idList = todoList.map((item) => {
      return item.id
    })
    const maxId = idList.length === 0 ? 0 : Math.max(...idList)
    return maxId + 1
  }

  return (
    <>
      <Button mt={5} ml={5} onClick={onOpen}>
        +TODO
      </Button>
      <Text mt={5} ml={5} color='black'>
        TODOs: {totalTodo} 📃
      </Text>
      <Modal size='full' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter TODO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box ml={5}>
              <Input
                mt={5}
                display='block'
                width='100%'
                variant='flushed'
                placeholder='Today todo...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Input
                mt={5}
                display='block'
                width='100%'
                variant='flushed'
                placeholder='Select Date and Time'
                size='md'
                type='datetime-local'
                value={deadLine}
                onChange={(e) => setDeadLine(e.target.value)}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup
              ml={5}
              gap='2'
              minWidth='max-content'
              alignItems='center'
            >
              <Spacer />
              <Button mt={5} mr={3} colorScheme='gray' onClick={handleClear}>
                clear
              </Button>
              <Button mt={5} colorScheme='blue' onClick={handleSave}>
                save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        display='flex'
        alignItems='right'
        justifyContent='space-between'
      ></Box>
    </>
  )
}
