const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  type dataObj = {
    id: number
    awayTeam: {
      id: number
      name: string
      crest: string
    }
    homeTeam: {
      id: number
      name: string
      crest: string
    }
    score: {
      winner: string
      fullTime: {
        home: number
        away: number
      }
    }
    status: string
    utcDate: Date
    matches: {
      [prop: string]: any
    }
  }
  
  interface matchObj {
    [prop: string]: any
  }

  const isResponse = (maybeData: any): maybeData is dataObj => {
    return maybeData && (
      Array.isArray(maybeData.matches)
    )
  }

  const response = await $fetch(`${runtimeConfig.soccerApiUrl}/competitions/${name}/matches`, {
    method: 'get',
    headers: {
      'X-Auth-Token': runtimeConfig.soccerApiKey
    }
  }).catch((error) => error.data)
  
  if (isResponse(response)) {
    const matchData: Object[] = []
    response.matches.forEach((v: dataObj) => {
      let matchDataObj: matchObj = {}
      matchDataObj['id'] = v.id
      matchDataObj['homeId'] = v.homeTeam.id
      matchDataObj['home'] = v.homeTeam.name
      matchDataObj['homeCrest'] = v.homeTeam.crest
      matchDataObj['awayId'] = v.awayTeam.id
      matchDataObj['away'] = v.awayTeam.name
      matchDataObj['awayCrest'] = v.awayTeam.crest
      matchDataObj['winner'] = v.score.winner
      matchDataObj['status'] = v.status
      matchDataObj['fullTime'] = v.score.fullTime
      matchDataObj['utcDate'] = v.utcDate
      matchData.push(Object.assign({}, matchDataObj))
    })

    return matchData
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
})