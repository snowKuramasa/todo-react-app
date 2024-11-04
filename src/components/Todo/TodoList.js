import {
  Box,
  Button,
  List,
  ListItem,
  ListIcon,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import { todoListSelector } from '../../store/Selector'
import TodoEdit from './TodoEdit'

export default function TodoList() {
  const [todoList, setTodoList] = useRecoilState(todoListSelector)

  const handleRemove = (e) => {
    const targetId = Number(e.target.dataset.id)
    setTodoList(todoList.filter((todo) => todo.id !== targetId))
  }

  const handleDone = (e) => {
    const targetId = Number(e.target.dataset.id)
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === targetId) {
          return {
            ...todo,
            isDone: true,
          }
        } else {
          return todo
        }
      })
    )
  }

  return (
    <>
      <List mt={5} ml={5} width='50%'>
        {todoList.map((todo) => {
          return (
            <ListItem key={todo.id}>
              <Card>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                      <Text pt='2' fontSize='sm'>
                        {todo.isDone && (
                          <ListIcon as={CheckCircleIcon} color='green.500' />
                        )}
                        {todo.content}
                      </Text>
                      <TodoEdit targetId={todo.id} />
                    </Box>
                    <Box>
                      <Text pt='2' fontSize='sm'>
                        Deadline : {todo.deadLine}
                      </Text>
                      {/* <Text pt='2' fontSize='sm'>
                        Created : {todo.created}
                      </Text> */}
                    </Box>
                    <Box display='flex' justifyContent='flex-end'>
                      <Button
                        colorScheme='red'
                        data-id={todo.id}
                        onClick={handleRemove}
                      >
                        delete
                      </Button>
                      <Button
                        ml={5}
                        data-id={todo.id}
                        onClick={handleDone}
                        colorScheme='blue'
                      >
                        done
                      </Button>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
