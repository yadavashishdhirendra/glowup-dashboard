const SaloonSchema = require("../models/SaloonSchema")

exports.saloonTags = async (ids,action,values,res) => {
      let response = await Promise.all(
            ids.map(async (id) => {
                  const saloon = await SaloonSchema.findByIdAndUpdate(id, { [action]: { tags: values } })
                  return saloon
            })
      )
      return res.status(200).json({
            response
      })
}
