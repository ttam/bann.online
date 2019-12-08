const elements = []
const mouse = { x: window.outerWidth / 2 - 75, y: window.outerHeight / 2 - 75 }
const total = 10
const offset = 0.8

const Matt = function (index) {
    this.el = document.body.appendChild(document.createElement('div'))
    this.el.style.zIndex = index

    this.x = mouse.x
    this.y = mouse.y
}

Matt.prototype.move = function (x, y) {
    this.x = x
    this.y = y

    this.el.style.left = this.x + 'px'
    this.el.style.top = this.y + 'px'
};

['mousemove', 'touchmove'].forEach(action => document.addEventListener(action, (event) => {
    const data = event.targetTouches ? event.targetTouches[0] : event

    mouse.x = data.pageX
    mouse.y = data.pageY
}))

const bannonLine = () => {
    let { x, y } = mouse

    elements.forEach((matt, index, a) => {
        const { x: offsetX, y: offsetY } = elements[index + 1] || elements[0]

        matt.move(x, y)
        x += (offsetX - x) * offset
        y += (offsetY - y) * offset
    })

    requestAnimationFrame(bannonLine)
}

for (let i = total; i > 0; i--) {
    elements.push(new Matt(i))
}

bannonLine()
