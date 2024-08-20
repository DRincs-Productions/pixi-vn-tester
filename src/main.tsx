import { canvas, narration } from '@drincs/pixi-vn'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

canvas.initialize(body, 1920, 1080, {
    backgroundColor: "#303030"
}).then(() => {
    // React setup with ReactDOM
    const root = document.getElementById('root')
    if (!root) {
        throw new Error('root element not found')
    }

    canvas.initializeHTMLLayout(root)
    const reactRoot = createRoot(canvas.htmlLayout)

    reactRoot.render(
        <App />
    )
})

narration.onGameEnd = async (props) => {
    props.navigate("/")
}
