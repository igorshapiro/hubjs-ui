function toWords(millis) {
  if (!millis) return "N/A"
  if (millis < 1000) return "< 1 sec"
  else if (millis < 60000) return Math.round(millis / 1000) + " seconds"
  else if (millis < 3600000) return Math.round(millis / 60000) + " minutes"
  return Math.round(millis / 3600000) + " hours"
}

export default Ember.Helper.helper(function(millis, namedParams) {
  var type = namedParams.type || "relative"
  if (type === "relative") {
    var millis = Date.now() - millis
    if (millis > 0) {
      return `${toWords(millis)} ago`
    } else if (millis < 0) {
      return `in ${toWords(-millis)}`
    } else {
      return "now"
    }
  }
  else {
    return toWords(millis)
  }
})
