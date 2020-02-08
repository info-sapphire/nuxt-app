const fs = require('fs')
const path = require('path')

const icons = require('../client/assets/awesome-icons/light')

const dir = path.join(__dirname, 'uploads', 'tmp', '2020')

try {
  if (!fs.existsSync(dir)) {
    // https://issue.life/questions/31645738/
    fs.mkdirSync(dir, { recursive: true })
  }

  Object.entries(icons).forEach(icon => {
    const [name, item] = icon
    const content = `module.exports = ${JSON.stringify(item)}`
    fs.writeFileSync(path.join(dir, `${name}.js`), content)
  })
} catch (err) {
  console.error(err)
}
