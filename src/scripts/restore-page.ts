import { getGeoLocation } from '@/services/api'
import { renderAddressDetails } from './render-address-details'
import { renderMap } from './render-map'
import { validateIP } from './search-form'

export async function restorePage(searchValue: string) {
  const { param } = validateIP(searchValue)
  try {
    const { result } = await getGeoLocation(param)
    if (!result) throw new Error('Error at getGeoLocation function')
    renderMap({
      lng: result.location.longitude,
      lat: result.location.latitude,
    })
    renderAddressDetails(result)
  } catch (error) {
    console.log(error)
  }
}

interface AddParamAtURLProps {
  key: string
  value: string
}

export function addParamAtURL({ key, value }: AddParamAtURLProps) {
  const url = new URL(window.location.toString())
  url.searchParams.set(key, value)
  window.history.pushState({}, '', url)
}

type GetParamFromURLProps = Pick<AddParamAtURLProps, 'key'>

export function getParamFromURL({ key }: GetParamFromURLProps) {
  const url = new URL(window.location.toString())
  const param = url.searchParams.get(key)
  return param || ''
}
