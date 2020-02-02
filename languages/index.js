const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

const languages = {}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file))
    models[model.name] = model
  })

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

module.exports = {
  sequelize,
  ...models
}
