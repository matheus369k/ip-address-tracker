import { getGeoLocation } from '@/services/api'
import { validateIP } from './search-form'
import { getParamFromURL } from './restore-page'

export async function renderDialogModel() {
  const searchParam = getParamFromURL({ key: 'search' })
  const dialogMoreDetails = document.getElementById(
    'dialog-more-details'
  ) as HTMLDialogElement | null

  if (!dialogMoreDetails) return

  try {
    const { param } = validateIP(searchParam)
    const { result } = await getGeoLocation(param)

    if (!result) throw new Error('Not found getGeoLocation datas')
    dialogMoreDetails.showModal()

    const dialogIP = document.getElementById('dialog-ip')
    if (dialogIP) dialogIP.innerText = result.ip
    const dialogCountry = document.getElementById('dialog-country')
    if (dialogCountry) dialogCountry.innerText = result.area.code
    const dialogRegion = document.getElementById('dialog-region')
    if (dialogRegion) dialogRegion.innerText = result.area.name
    const dialogCity = document.getElementById('dialog-city')
    if (dialogCity) dialogCity.innerText = result.city.name
    const dialogLat = document.getElementById('dialog-lat')
    if (dialogLat) dialogLat.innerText = result.location.latitude.toString()
    const dialogLng = document.getElementById('dialog-lng')
    if (dialogLng) dialogLng.innerText = result.location.longitude.toString()
    const dialogPostCode = document.getElementById('dialog-postCode')
    if (dialogPostCode) dialogPostCode.innerText = result.postcode
    const dialogTimezone = document.getElementById('dialog-timezone')
    if (dialogTimezone) dialogTimezone.innerText = result.time.timezone
    const dialogISP = document.getElementById('dialog-isp')
    if (dialogISP) dialogISP.innerText = result.asn.organisation
  } catch (error) {
    console.log(error)
  }
}
