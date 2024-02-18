export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const name = getRouterParam(event, 'name')
  const data = await $fetch(`${runtimeConfig.jsonPlaceUrl}/${name}`, {
      method: 'get'
    })
    return data
})