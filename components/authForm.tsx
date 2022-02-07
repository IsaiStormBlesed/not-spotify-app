import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'
import NextImage from 'next/image'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" width={120} height={60} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              marginBottom="20px"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              marginBottom="30px"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              width="100%"
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.400',
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
