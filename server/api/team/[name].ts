const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {

  const name = getRouterParam(event, 'name')

  interface teamObj {
    [prop: string]: any
  }

  interface team {
    name: string
    coach: {
      id: number
      name: string
      position?: string
      dateOfBirth: string
      nationality: string
    }
    squad: {
      [prop: string]: any
    }
  }

  const isResponse = (maybeData: any): maybeData is team => {
    return maybeData && (
      typeof maybeData.coach === 'object' && Array.isArray(maybeData.squad)
    )
  }
  const response = await $fetch(`${runtimeConfig.soccerApiUrl}/teams/${name}`, {
    method: 'get',
    headers: {
      'X-Auth-Token': runtimeConfig.soccerApiKey
    }
  }).catch((error) => error.data)

  if (isResponse(response)) {
    let teamName = response.name

    let { id, name, dateOfBirth, nationality } = response.coach
    let obj:teamObj = {}
    obj.id = id
    obj.name = name
    obj.dateOfBirth = dateOfBirth
    obj.nationality = nationality
    obj.position = 'Coach'

    const teamData = []
    teamData.push(Object.assign({}, obj))

    for(let i = 0; i < response.squad.length; i++) {
      obj = {}
      obj.id = response.squad[i].id
      obj.name = response.squad[i].name
      obj.dateOfBirth = response.squad[i].dateOfBirth
      obj.nationality = response.squad[i].nationality
      obj.position = response.squad[i].position
      teamData.push(Object.assign({}, obj))
    }

    return {
      teamName,
      teamData
    }

  } else {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})