import type { ResponseGeoLocationType } from '@/services/api'

export function renderAddressDetails({
  ip,
  area,
  city,
  asn,
  postcode,
  time,
}: ResponseGeoLocationType) {
  const ipElement = document.getElementById('address-details-ip')
  if (ipElement) {
    ipElement.innerText = ip || 'unknown'
  }

  const locationElement = document.getElementById('address-details-location')
  if (locationElement) {
    const locationDetails = `${city.name || 'unknown'}, ${
      area.code || 'unknown'
    }, ${postcode || 'unknown'}`
    locationElement.innerText = locationDetails
  }

  const timezoneElement = document.getElementById('address-details-timezone')
  if (timezoneElement) {
    timezoneElement.innerText = time.timezone || 'unknown'
  }

  const ispElement = document.getElementById('address-details-isp')
  if (ispElement) {
    ispElement.innerText = asn.organisation || 'unknown'
  }
}

export function closeDialogModel() {
  const dialogMoreDetails = document.getElementById(
    'dialog-more-details'
  ) as HTMLDialogElement | null
  const dialogCloseIcon = document.getElementById('dialog-close-icon')

  if (dialogCloseIcon && dialogMoreDetails) {
    dialogCloseIcon.addEventListener('click', () => {
      dialogMoreDetails.close()
    })
  }
}
