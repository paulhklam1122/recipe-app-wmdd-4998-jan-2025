import { Box, Button, ButtonText, Center, Text } from '@gluestack-ui/themed'

const RecipeContainer = ({ navigation, route }) => {
  const { label, url } = route.params

  return (
    <Box width='100%'>
      <Center py={10}>
        <Text my={10}>{label}</Text>
      </Center>
      <Button
        variant='link'
        onPress={() => {
          navigation.navigate('Web', {
            label,
            url
          })
        }}
      >
        <ButtonText>View Online</ButtonText>
      </Button>
    </Box>
  )
}

export default RecipeContainer
