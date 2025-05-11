import { CONSTANTS_KEYS, globalVariables } from '@/constants'
import { fetchGeoApi } from '@/utils/axios'

interface Location {
  latitude: number
  longitude: number
}

interface Area {
  code: string
  geonameid: number
  name: string
}

interface ASN {
  number: number
  organisation: string
}

interface City {
  geonameid: number
  name: string
  population: number
}

interface Continent {
  geonameid: number
  name: string
  code: string
}

interface Country {
  geonameid: number
  name: string
  code: string
  capital: string
  area_size: string
  population: number
  phone_code: string
  is_in_eu: boolean
  languages: Record<string, string>
  flag: {
    file: string
    emoji: string
    unicode: string
  }
  tld: string
}

interface Currency {
  code: string
  name: string
}

interface Security {
  is_tor: boolean
  is_proxy: boolean
  is_crawler: boolean
  is_threat: boolean
  is_thread: boolean
}

interface TimeInfo {
  timezone: string
  gtm_offset: number
  gmt_offset: number
  is_daylight_saving: boolean
  code: string
}

export interface ResponseGeoLocationType {
  ip: string
  type: string
  location: Location
  postcode: string
  area: Area
  asn: ASN
  city: City
  continent: Continent
  country: Country
  currency: Currency
  security: Security
  time: TimeInfo
  status: string
}

export interface LocationIP {
  ip: string
  isMyIp: boolean
}

export async function getGeoLocation(ipAddress: string) {
  const { GEOLOCATION_DATAS, LOCATION_IP } = globalVariables()
  if (LOCATION_IP && LOCATION_IP.ip === ipAddress && GEOLOCATION_DATAS) {
    return {
      result: GEOLOCATION_DATAS,
    }
  }
  try {
    const response = await fetchGeoApi.get(ipAddress)
    const result: ResponseGeoLocationType = response.data
    localStorage.setItem(
      CONSTANTS_KEYS.LOCAL_STORAGE_GEOLOCATION_DATA,
      JSON.stringify(result)
    )

    localStorage.setItem(
      CONSTANTS_KEYS.LOCAL_STORAGE_LOCATION_IP,
      JSON.stringify({
        ip: result.ip,
        isMyIp: false,
      } as LocationIP)
    )
    return {
      result,
    }
  } catch (error) {
    console.log(error)
    return {
      result: undefined,
    }
  }
}

export async function getYourLocation() {
  const { GEOLOCATION_DATAS, LOCATION_IP } = globalVariables()
  if (LOCATION_IP && GEOLOCATION_DATAS && LOCATION_IP.isMyIp) {
    return {
      result: GEOLOCATION_DATAS,
    }
  }
  try {
    const response = await fetchGeoApi.get('check')
    const result: ResponseGeoLocationType = response.data
    localStorage.setItem(
      CONSTANTS_KEYS.LOCAL_STORAGE_GEOLOCATION_DATA,
      JSON.stringify(result)
    )
    localStorage.setItem(
      CONSTANTS_KEYS.LOCAL_STORAGE_LOCATION_IP,
      JSON.stringify({
        ip: result.ip,
        isMyIp: true,
      } as LocationIP)
    )
    return {
      result,
    }
  } catch (error) {
    console.log(error)
    return {
      result: undefined,
    }
  }
}
