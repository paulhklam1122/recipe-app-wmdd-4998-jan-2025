import { useState } from 'react'
import Form from '../forms/Form'
import { getRecipes } from '../../services/api'
import { Center } from '@gluestack-ui/themed'
import RecipesList from '../lists/RecipesList'
import Loading from '../layout/Loading'

const recipesResponse = [
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/1ce/1ce91d406dbc2bc21e59b346c6db7911.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLWVhc3QtMSJHMEUCIAX6SpHHy4%2FongRKWNoAXGK%2F4oLTlWs2mYF%2B2o1nCBOFAiEA1U15MKZ%2B3fGPH08dq5xBWr2CkcviWeWWJ8KyEzpvzvgquQUIaxAAGgwxODcwMTcxNTA5ODYiDONfgYBHKQhTw1qk8CqWBTiS9oUuIJrJ31Z3LYRtaXzpWRHfiZRcj4lyAawiHqwmbWvBkGULdpbRKwWXrcioBHfsoipTCs3N%2BngxcE%2BRjasyH2V7esXa4A%2F3wC6x%2FRC7lQIumh8lT7vGzDTRMqvndHs5wkzLA6NGln4mOHqSt9S97BYvNF9KjfVV%2BqLN7KB2kQDun3wCKLlvcVG%2BXdJqgyowa%2BZWpFq0NlrUupgOIbLFHi81KQpkNxCsPnn8I8AuQde1n4Y5EekGOHzM8JRrRDKG61g6en91lErLPirUKlkTKzYX8qolhAQu%2F5JAIH7Rj%2F7406r%2B5gCk4QuCKgnXeoNXTCT%2B6uBh3Fk%2FChfeISNHdZ7SfjvnexOmlNhHHtZHa4fky1gfL4PZtV4%2B8qX3GA2qGYQNTnXgzytGAEBI8oOIxsYdr8Bb6bw0Re8b3YJndRw2ixhO%2FkAFTu3Fb7BsxaJsJCCTML3SsIf0Qm52ucRnEUyZJwx6ktBRWhWnm4wCuMlXf0P7YDYfQCQRUeMXRyOZaM4DeXMvZepbp1p%2Fz7gTyBST2O8bh4v%2FD33S5%2BKwQEdH%2FszHzpbNB2pACr%2FJnTgl1vm9jpshaeWgvo1%2FfMkRyP6yvh0aQJXjai%2BTbHkhaZeBwBpsXLplqTWoW%2Be85Sq%2BX121J%2ByHoVjKtM9v6tGe0VNVyRMJRDxZAo3ZVospblzK6XdRkOvpxmetU24Ca9GbgCDx8cfWFHgmrKomiQkgGDyeHxXndycWaG8OuFtiO9I5c%2F3OjO246MAJuc40PRWi6MKbns6TXAJ9t30CIzK%2B1gPkx7ZVLvNXnBPn7hqmqINYErOnNfWe%2FQ626hP03zOrHBXMxgm62ayGKECI4%2BsduM7SrwCuQoCU6itiTFPfMTcgqdoIMIHElb0GOrEBxN4V1IP92tMZgfhfxgq3sJBknrvjUNuHAaKZXtwXbgf55EfWxq73xqVXnhsiqZ%2BTTK3msDcB7tY%2FBK7AQa68tjXm7LBLlJLK6Ozlv07rXeZg5vHi%2FyfIZWbJ1rfjkYXsrvjlCkUqxV2SKAWS7JtTKWNEYEGpy6yDlabpEiqLv75sHMosO6a9OpybQ5XUbMG%2BzYP%2FtG1j8bd0uR7ISECfMg2lkGgkaRCHSFlJ6Hkvbzgd&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250207T024126Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFO6AB35SM%2F20250207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f780099fa287720a9cbf0abca94a85522f7758ef6c738ba618251bc53b17002d',
    label: 'Beef tacos',
    source: 'BBC Good Food',
    url: 'https://www.bbcgoodfood.com/recipes/next-level-minced-beef-tacos'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/d96/d964289a83afcc99c8022addf088444d.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLWVhc3QtMSJHMEUCIAX6SpHHy4%2FongRKWNoAXGK%2F4oLTlWs2mYF%2B2o1nCBOFAiEA1U15MKZ%2B3fGPH08dq5xBWr2CkcviWeWWJ8KyEzpvzvgquQUIaxAAGgwxODcwMTcxNTA5ODYiDONfgYBHKQhTw1qk8CqWBTiS9oUuIJrJ31Z3LYRtaXzpWRHfiZRcj4lyAawiHqwmbWvBkGULdpbRKwWXrcioBHfsoipTCs3N%2BngxcE%2BRjasyH2V7esXa4A%2F3wC6x%2FRC7lQIumh8lT7vGzDTRMqvndHs5wkzLA6NGln4mOHqSt9S97BYvNF9KjfVV%2BqLN7KB2kQDun3wCKLlvcVG%2BXdJqgyowa%2BZWpFq0NlrUupgOIbLFHi81KQpkNxCsPnn8I8AuQde1n4Y5EekGOHzM8JRrRDKG61g6en91lErLPirUKlkTKzYX8qolhAQu%2F5JAIH7Rj%2F7406r%2B5gCk4QuCKgnXeoNXTCT%2B6uBh3Fk%2FChfeISNHdZ7SfjvnexOmlNhHHtZHa4fky1gfL4PZtV4%2B8qX3GA2qGYQNTnXgzytGAEBI8oOIxsYdr8Bb6bw0Re8b3YJndRw2ixhO%2FkAFTu3Fb7BsxaJsJCCTML3SsIf0Qm52ucRnEUyZJwx6ktBRWhWnm4wCuMlXf0P7YDYfQCQRUeMXRyOZaM4DeXMvZepbp1p%2Fz7gTyBST2O8bh4v%2FD33S5%2BKwQEdH%2FszHzpbNB2pACr%2FJnTgl1vm9jpshaeWgvo1%2FfMkRyP6yvh0aQJXjai%2BTbHkhaZeBwBpsXLplqTWoW%2Be85Sq%2BX121J%2ByHoVjKtM9v6tGe0VNVyRMJRDxZAo3ZVospblzK6XdRkOvpxmetU24Ca9GbgCDx8cfWFHgmrKomiQkgGDyeHxXndycWaG8OuFtiO9I5c%2F3OjO246MAJuc40PRWi6MKbns6TXAJ9t30CIzK%2B1gPkx7ZVLvNXnBPn7hqmqINYErOnNfWe%2FQ626hP03zOrHBXMxgm62ayGKECI4%2BsduM7SrwCuQoCU6itiTFPfMTcgqdoIMIHElb0GOrEBxN4V1IP92tMZgfhfxgq3sJBknrvjUNuHAaKZXtwXbgf55EfWxq73xqVXnhsiqZ%2BTTK3msDcB7tY%2FBK7AQa68tjXm7LBLlJLK6Ozlv07rXeZg5vHi%2FyfIZWbJ1rfjkYXsrvjlCkUqxV2SKAWS7JtTKWNEYEGpy6yDlabpEiqLv75sHMosO6a9OpybQ5XUbMG%2BzYP%2FtG1j8bd0uR7ISECfMg2lkGgkaRCHSFlJ6Hkvbzgd&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250207T024126Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFO6AB35SM%2F20250207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=dffc82282345d19b475f6dfbe19a590fc6e6d3c4e8e3fc37f3ee6ea9cee79043',
    label: 'Smoked Wagyu Beef Shank',
    source: 'Food52',
    url: 'https://food52.com/recipes/86509-smoked-wagyu-beef-shank'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/ac6/ac62c888656327623f1bf247638ca34b.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLWVhc3QtMSJHMEUCIAX6SpHHy4%2FongRKWNoAXGK%2F4oLTlWs2mYF%2B2o1nCBOFAiEA1U15MKZ%2B3fGPH08dq5xBWr2CkcviWeWWJ8KyEzpvzvgquQUIaxAAGgwxODcwMTcxNTA5ODYiDONfgYBHKQhTw1qk8CqWBTiS9oUuIJrJ31Z3LYRtaXzpWRHfiZRcj4lyAawiHqwmbWvBkGULdpbRKwWXrcioBHfsoipTCs3N%2BngxcE%2BRjasyH2V7esXa4A%2F3wC6x%2FRC7lQIumh8lT7vGzDTRMqvndHs5wkzLA6NGln4mOHqSt9S97BYvNF9KjfVV%2BqLN7KB2kQDun3wCKLlvcVG%2BXdJqgyowa%2BZWpFq0NlrUupgOIbLFHi81KQpkNxCsPnn8I8AuQde1n4Y5EekGOHzM8JRrRDKG61g6en91lErLPirUKlkTKzYX8qolhAQu%2F5JAIH7Rj%2F7406r%2B5gCk4QuCKgnXeoNXTCT%2B6uBh3Fk%2FChfeISNHdZ7SfjvnexOmlNhHHtZHa4fky1gfL4PZtV4%2B8qX3GA2qGYQNTnXgzytGAEBI8oOIxsYdr8Bb6bw0Re8b3YJndRw2ixhO%2FkAFTu3Fb7BsxaJsJCCTML3SsIf0Qm52ucRnEUyZJwx6ktBRWhWnm4wCuMlXf0P7YDYfQCQRUeMXRyOZaM4DeXMvZepbp1p%2Fz7gTyBST2O8bh4v%2FD33S5%2BKwQEdH%2FszHzpbNB2pACr%2FJnTgl1vm9jpshaeWgvo1%2FfMkRyP6yvh0aQJXjai%2BTbHkhaZeBwBpsXLplqTWoW%2Be85Sq%2BX121J%2ByHoVjKtM9v6tGe0VNVyRMJRDxZAo3ZVospblzK6XdRkOvpxmetU24Ca9GbgCDx8cfWFHgmrKomiQkgGDyeHxXndycWaG8OuFtiO9I5c%2F3OjO246MAJuc40PRWi6MKbns6TXAJ9t30CIzK%2B1gPkx7ZVLvNXnBPn7hqmqINYErOnNfWe%2FQ626hP03zOrHBXMxgm62ayGKECI4%2BsduM7SrwCuQoCU6itiTFPfMTcgqdoIMIHElb0GOrEBxN4V1IP92tMZgfhfxgq3sJBknrvjUNuHAaKZXtwXbgf55EfWxq73xqVXnhsiqZ%2BTTK3msDcB7tY%2FBK7AQa68tjXm7LBLlJLK6Ozlv07rXeZg5vHi%2FyfIZWbJ1rfjkYXsrvjlCkUqxV2SKAWS7JtTKWNEYEGpy6yDlabpEiqLv75sHMosO6a9OpybQ5XUbMG%2BzYP%2FtG1j8bd0uR7ISECfMg2lkGgkaRCHSFlJ6Hkvbzgd&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250207T024126Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFO6AB35SM%2F20250207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e59a858d1055d87635692edebae795efc07e19b47b3e0292ade247f126cae303',
    label: 'Roast Beef',
    source: 'Saveur',
    url: 'https://www.saveur.com/recipes/roast-beef-recipe'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/fdb/fdbf70c97bdfb86dc33e2dbab97dd847.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaCXVzLWVhc3QtMSJHMEUCIAX6SpHHy4%2FongRKWNoAXGK%2F4oLTlWs2mYF%2B2o1nCBOFAiEA1U15MKZ%2B3fGPH08dq5xBWr2CkcviWeWWJ8KyEzpvzvgquQUIaxAAGgwxODcwMTcxNTA5ODYiDONfgYBHKQhTw1qk8CqWBTiS9oUuIJrJ31Z3LYRtaXzpWRHfiZRcj4lyAawiHqwmbWvBkGULdpbRKwWXrcioBHfsoipTCs3N%2BngxcE%2BRjasyH2V7esXa4A%2F3wC6x%2FRC7lQIumh8lT7vGzDTRMqvndHs5wkzLA6NGln4mOHqSt9S97BYvNF9KjfVV%2BqLN7KB2kQDun3wCKLlvcVG%2BXdJqgyowa%2BZWpFq0NlrUupgOIbLFHi81KQpkNxCsPnn8I8AuQde1n4Y5EekGOHzM8JRrRDKG61g6en91lErLPirUKlkTKzYX8qolhAQu%2F5JAIH7Rj%2F7406r%2B5gCk4QuCKgnXeoNXTCT%2B6uBh3Fk%2FChfeISNHdZ7SfjvnexOmlNhHHtZHa4fky1gfL4PZtV4%2B8qX3GA2qGYQNTnXgzytGAEBI8oOIxsYdr8Bb6bw0Re8b3YJndRw2ixhO%2FkAFTu3Fb7BsxaJsJCCTML3SsIf0Qm52ucRnEUyZJwx6ktBRWhWnm4wCuMlXf0P7YDYfQCQRUeMXRyOZaM4DeXMvZepbp1p%2Fz7gTyBST2O8bh4v%2FD33S5%2BKwQEdH%2FszHzpbNB2pACr%2FJnTgl1vm9jpshaeWgvo1%2FfMkRyP6yvh0aQJXjai%2BTbHkhaZeBwBpsXLplqTWoW%2Be85Sq%2BX121J%2ByHoVjKtM9v6tGe0VNVyRMJRDxZAo3ZVospblzK6XdRkOvpxmetU24Ca9GbgCDx8cfWFHgmrKomiQkgGDyeHxXndycWaG8OuFtiO9I5c%2F3OjO246MAJuc40PRWi6MKbns6TXAJ9t30CIzK%2B1gPkx7ZVLvNXnBPn7hqmqINYErOnNfWe%2FQ626hP03zOrHBXMxgm62ayGKECI4%2BsduM7SrwCuQoCU6itiTFPfMTcgqdoIMIHElb0GOrEBxN4V1IP92tMZgfhfxgq3sJBknrvjUNuHAaKZXtwXbgf55EfWxq73xqVXnhsiqZ%2BTTK3msDcB7tY%2FBK7AQa68tjXm7LBLlJLK6Ozlv07rXeZg5vHi%2FyfIZWbJ1rfjkYXsrvjlCkUqxV2SKAWS7JtTKWNEYEGpy6yDlabpEiqLv75sHMosO6a9OpybQ5XUbMG%2BzYP%2FtG1j8bd0uR7ISECfMg2lkGgkaRCHSFlJ6Hkvbzgd&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250207T024126Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFO6AB35SM%2F20250207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=812643ad8cc44901005b1dd72260e0fa9f6f18e5d2daf8217e6c8e32d986c602',
    label: 'Beef Tea',
    source: 'Epicurious',
    url: 'https://www.epicurious.com/recipes/food/views/beef-tea-395253'
  }
]

const RecipesContainer = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [ingredient, setIngredient] = useState(null)
  const [recipes, setRecipes] = useState(null)

  const { navigation } = props

  const handleInputChange = ingredient => {
    setIngredient(ingredient)
  }

  const fetchRecipes = () => {
    setIsLoading(true)

    // getRecipes(ingredient)

    setRecipes(recipesResponse)

    setIsLoading(false)
  }

  return (
    <Center px={4}>
      <Form onInputChange={handleInputChange} onSubmit={fetchRecipes} />
      {isLoading ? <Loading /> : <RecipesList navigation={navigation} recipes={recipes} />}
    </Center>
  )
}

export default RecipesContainer
