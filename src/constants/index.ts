import type { LocationIP, ResponseGeoLocationType } from '@/services/api'

export const CONSTANTS_KEYS = {
  LOCAL_STORAGE_GEOLOCATION_DATA: 'IP_ADDRESS_TRACKER__GEOLOCATION_DATA',
  LOCAL_STORAGE_LOCATION_IP: 'IP_ADDRESS_TRACKER__LOCATION_IP',
}

export function globalVariables() {
  const GEOLOCATION_DATAS = localStorage.getItem(
    CONSTANTS_KEYS.LOCAL_STORAGE_GEOLOCATION_DATA
  )
  const LOCATION_IP = localStorage.getItem(
    CONSTANTS_KEYS.LOCAL_STORAGE_LOCATION_IP
  )
  return {
    GEOLOCATION_DATAS: GEOLOCATION_DATAS
      ? (JSON.parse(GEOLOCATION_DATAS) as ResponseGeoLocationType)
      : null,
    LOCATION_IP: LOCATION_IP ? (JSON.parse(LOCATION_IP) as LocationIP) : null,
  }
}
