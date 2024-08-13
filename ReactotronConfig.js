import Reactotron, { networking } from 'reactotron-react-native'

Reactotron.configure() // controls connection & communication settings
    .use(networking()) // <--- here we go!
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!
