class UtilitiesService {
    getDateConvert(format, date = new Date()) {

        if ("MM dd, yyyy" === format) {
          return `${monthNames[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`
        }
    
        if ('dd/MM/yyyy' === format) {
          return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
        }
    
        if ('mm/dd/yyyy' === format) {
          return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`
        }
    
        if ('dd/MM/yyyy HH:mm' === format) {
          return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        }
    
        if ("MM dd del yyyy" === format) {
          return `${monthNames[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")} del ${date.getFullYear()}`
        }
    
        if ("MM/dd/yyyy" === format) {
          return `${monthShortNames[date.getMonth()]}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear()}`
        }
    
        if ("yyyyMMdd" === format) {
          return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
        }
      }
}

module.exports = new UtilitiesService();