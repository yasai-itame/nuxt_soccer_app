const runtimeConfig = useRuntimeConfig()

export default defineEventHandler( async (event) => {
  const name = getRouterParam(event, 'name')

  type dataObj = {
    id: number
    area: Object
    name: string
    code: string
    type: string
    emblem: string
    plan: string
    currentSeason: Object
    numberOfAvailableSeasons: number
    lastUpdated: Date
    competitions: {
      [prop: string]: any
    }
  }

  interface obj {
    [prop: string]: any
  }
  
  interface leagueObj {
    [prop: string]: any
  }

  const leagueData: any = []

  let leagueOrderAction = (code: string) => {
    switch (code) {
      case 'WC':
        return 1
      case 'CL':
        return 2
      case 'EC':
        return 3
      case 'CLI':
        return 4
      case 'PL':
        return 5
      case 'ELC':
        return 6
      case 'PD':
        return 7
      case 'FL1':
        return 8
      case 'BL1':
        return 9
      case 'SA':
        return 10
      case 'DED':
        return 11
      case 'PPL':
        return 12
      case 'BSA':
        return 13
      default:
        return ''
    }
  }

  let teamCheck = (code: string) => {
    switch (code) {
      case 'WC':
        return 'off'
      case 'EC':
        return 'off'
      default:
        return 'on'
    }
  }

  const isResponse = (maybeData: any): maybeData is dataObj => {
    return maybeData && (
      Array.isArray(maybeData.competitions)
    )
  }

  const response = await $fetch(`${runtimeConfig.soccerApiUrl}/${name}`, {
    method: 'get',
    headers: {
      'X-Auth-Token': runtimeConfig.soccerApiKey
    }
  }).catch((error) => error.data)

  if (isResponse(response)) {
    response.competitions.forEach((v: dataObj) => {
      let leagueDataObj: leagueObj = {}
      leagueDataObj['leagueName'] = v.name
      leagueDataObj['order'] = leagueOrderAction(v.code)
      leagueDataObj['teamCheck'] = teamCheck(v.code)
      leagueDataObj['id'] = v.id
      leagueData.push(Object.assign({}, leagueDataObj))
    })

    leagueData.sort((a: obj, b: obj) => {
      return a.order - b.order
    })

    return leagueData
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})