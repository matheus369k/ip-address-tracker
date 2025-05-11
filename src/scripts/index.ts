import { addParamAtURL, getParamFromURL, restorePage } from './restore-page'
import { getSearchFormValue } from './search-form'
import { getYourLocation } from '@/services/api'
import { renderMap } from './render-map'
import {
  closeDialogModel,
  renderAddressDetails,
} from './render-address-details'
import '../styles/index.scss'
import { renderDialogModel } from './render-dialog-model'

document.addEventListener('DOMContentLoaded', () => {
  const FormContainer = document.getElementById('find-address-form')
  const YourLocation = document.getElementById('your-location')
  const MoreInfo = document.getElementById('more-info')
  const searchParam = getParamFromURL({ key: 'search' })

  if (MoreInfo) {
    closeDialogModel()
    MoreInfo.addEventListener('click', async () => {
      await renderDialogModel()
    })
  }

  if (YourLocation) {
    YourLocation.addEventListener('click', async () => {
      try {
        const { result } = await getYourLocation()
        if (!result) throw new Error('Not found your Ipv6')
        addParamAtURL({ key: 'search', value: result.ip })
        renderMap({
          lng: result.location.longitude,
          lat: result.location.latitude,
        })
        renderAddressDetails(result)
      } catch (error) {
        console.log(error)
      }
    })
  }

  FormContainer?.addEventListener('submit', (event) => {
    event.preventDefault()
    getSearchFormValue(event)
  })

  if (searchParam) {
    return restorePage(searchParam)
  }

  addParamAtURL({ key: 'search', value: '192.212.174.101' })
  restorePage('192.212.174.101')
})
