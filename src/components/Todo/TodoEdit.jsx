import {
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
  ListIcon,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { todoListSelector } from '../../store/Selector'
import { EditIcon } from '@chakra-ui/icons'

export default function TodoEdit({ targetId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [todoList, setTodoList] = useRecoilState(todoListSelector)

  const [content, setContent] = useState(
    targetId ? todoList.find((todo) => todo.id === targetId).content : ''
  )
  const [deadLine, setDeadLine] = useState(
    targetId ? todoList.find((todo) => todo.id === targetId).deadLine : ''
  )

  useEffect(() => {
    setContent(
      targetId ? todoList.find((todo) => todo.id === targetId).content : ''
    )
    setDeadLine(
      targetId ? todoList.find((todo) => todo.id === targetId).deadLine : ''
    )
    console.log(targetId)
  }, [targetId])

  const handleClear = () => {
    setContent('')
    setDeadLine('')
  }

  const handleSave = () => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === targetId) {
          return {
            ...todo,
            content: content,
            deadLine: deadLine,
          }
        } else {
          return todo
        }
      })
    )
    handleClear()
    onClose()
  }

  return (
    <>
      <Box display='flex' justifyContent='flex-end'>
        <ListIcon as={EditIcon} color='gray' onClick={onOpen} />
      </Box>

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
