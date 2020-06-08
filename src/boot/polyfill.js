// eslint-disable-next-line no-extend-native
String.prototype.reverse = function () {
  return this.split('').reverse().join('')
}

// eslint-disable-next-line no-extend-native
String.prototype.prepend = function (value) {
  return `${value}${this}`
}

// eslint-disable-next-line no-extend-native
String.prototype.replaceWith = function (replaces) {
  let replaced = this
  let regex
  for (let key in replaces) {
    if (!replaces.hasOwnProperty(key)) {
      continue
    }
    regex = new RegExp(key, 'g')
    replaced = replaced.replace(regex, replaces[key])
  }
  return replaced
}

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// eslint-disable-next-line no-extend-native
String.prototype.unCapitalize = function () {
  return this.charAt(0).toLowerCase() + this.slice(1)
}

// eslint-disable-next-line no-extend-native
String.prototype.toCamelCase = function (first = false) {
  const camelCase = this.replace(/-([a-z])/g, (group) => group[1].toUpperCase())
  if (!first) {
    return camelCase
  }
  return camelCase.capitalize()
}

// eslint-disable-next-line no-extend-native
String.prototype.toDashCase = function (first = false) {
  return this.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

// eslint-disable-next-line no-extend-native
Number.prototype.pad = function (size) {
  let padded = String(this)
  while (padded.length < (size || 2)) {
    padded = `0${padded}`
  }
  return padded
}
