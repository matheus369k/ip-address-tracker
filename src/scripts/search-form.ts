import { getGeoLocation } from '@/services/api'
import { renderAddressDetails } from './render-address-details'
import { addParamAtURL } from './restore-page'
import { renderMap } from './render-map'

export async function getSearchFormValue(event: Event) {
  const formElement = event.currentTarget as HTMLFormElement
  const inputElement = formElement.querySelector('input')
  const buttonElement = formElement.querySelector('button')
  if (formElement && inputElement) {
    inputElement.setAttribute('readonly', 'true')
    buttonElement?.setAttribute('disabled', 'true')
    const formData = new FormData(formElement)
    const searchValue = formData.get('search-field')?.toString()

    const { param } = validateIP(searchValue)
    try {
      const { result } = await getGeoLocation(param)
      if (!result) throw new Error('Error at getGeoLocation function')
      addParamAtURL({
        key: 'search',
        value: param,
      })
      renderAddressDetails(result)
      renderMap({
        lat: result.location.latitude,
        lng: result.location.longitude,
      })
    } catch (error) {
      console.log(error)
    } finally {
      inputElement.value = ''
      inputElement.removeAttribute('readonly')
      buttonElement?.removeAttribute('disabled')
    }
  }
}

export function validateIP(searchValue = '') {
  const regex = {
    IP: /^((?:[0-9]{1,3}\.){3}[0-9]{1,3}|(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})$/,
  }
  let param = ''

  if (regex.IP.test(searchValue)) {
    param = searchValue
  }

  return {
    param,
  }
}
