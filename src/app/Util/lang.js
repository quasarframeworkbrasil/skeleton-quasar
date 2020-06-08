import $lang from 'src/lang'

/**
 * @param {string} domain
 * @param {string} field
 * @param {Record} enumeration
 * @returns {Array}
 */
export const langEnumToOptions = (domain, field, enumeration) => {
  return Object.keys(enumeration).reduce((accumulator, key) => {
    accumulator.push({
      value: enumeration[key],
      label: $lang(`domains.${domain}.fields.${field}.enum.${enumeration[key]}`)
    })
    return accumulator
  }, [])
}
