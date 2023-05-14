export const checkString = (str) => {
      let resp = []
      if (!str) {
            return []
      }
      let hasComma = str.toString().includes(",")
      if (hasComma) {
            let test = str.split(",")
            test.map((s) => {
                  resp.push(parseInt(s))
            })
      }
      else {
            resp.push(str)
      }
      return resp
}