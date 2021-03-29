const React = require("react")
const Layout = require("./src/components/layout")

// Wraps every page in a component
// props provide same data to Layout as Page element will get
// including location, data, etc - you don't need to pass it
exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
