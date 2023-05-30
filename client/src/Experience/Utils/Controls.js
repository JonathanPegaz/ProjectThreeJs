import EventEmitter from "./EventEmitter.js";

export default class Controls extends EventEmitter
{
    constructor()
    {
        super()
        this.pause = false
        this.setKeys()
        this.setPointer()

        this.on('debugDown', () =>
        {
            if(location.hash === '#debug')
                location.hash = ''
            else
                location.hash = 'debug'

            location.reload()
        })
    }

    setKeys()
    {
        this.keys = {}

        // Map
        this.keys.map = [
            {
                codes: [ 'ArrowUp', 'KeyW' ],
                name: 'forward'
            },
            {
                codes: [ 'ArrowRight', 'KeyD' ],
                name: 'strafeRight'
            },
            {
                codes: [ 'ArrowDown', 'KeyS' ],
                name: 'backward'
            },
            {
                codes: [ 'ArrowLeft', 'KeyA' ],
                name: 'strafeLeft'
            },
            {
                codes: [ 'ShiftLeft', 'ShiftRight' ],
                name: 'boost'
            },
            {
                codes: [ 'KeyF' ],
                name: 'action'
            },
            {
                codes: [ 'KeyV' ],
                name: 'cameraMode'
            },
            /*{
                codes: [ 'KeyB' ],
                name: 'debug'
            },*/
            {
                codes: [ 'Space' ],
                name: 'jump'
            },
            {
                codes: [ 'ControlLeft', 'KeyC' ],
                name: 'crouch'
            },
        ]

        // Down keys
        this.keys.down = {}

        for(const mapItem of this.keys.map)
        {
            this.keys.down[mapItem.name] = false
        }

        // Find in map per code
        this.keys.findPerCode = (key) =>
        {
            return this.keys.map.find((mapItem) => mapItem.codes.includes(key))
        }

        // Event
        this.keydownHandler = (event) => {
            const mapItem = this.keys.findPerCode(event.code)

            if(mapItem)
            {
                this.trigger('keyDown', mapItem.name)
                this.trigger(`${mapItem.name}Down`)
                this.keys.down[mapItem.name] = true
            }
        }
        window.addEventListener('keydown', this.keydownHandler)

        this.keyupHandler = (event) => {
            const mapItem = this.keys.findPerCode(event.code)

            if(mapItem)
            {
                this.trigger('keyUp', mapItem.name)
                this.trigger(`${mapItem.name}Up`)
                this.keys.down[mapItem.name] = false
            }
        }
        window.addEventListener('keyup', this.keyupHandler)
    }

    setPointer()
    {
        this.pointer = {}
        this.pointer.down = false
        this.pointer.deltaTemp = { x: 0, y: 0 }
        this.pointer.delta = { x: 0, y: 0 }

        this.pointerdownHandler = () => {
            this.pointer.down = true
        }
        window.addEventListener('pointerdown', this.pointerdownHandler)

        this.pointermoveHandler = (event) => {
            this.pointer.deltaTemp.x += event.movementX
            this.pointer.deltaTemp.y += event.movementY
        }
        window.addEventListener('pointermove', this.pointermoveHandler)

        this.pointerupHandler = () => {
            this.pointer.down = false
        }
        window.addEventListener('pointerup', this.pointerupHandler)
    }

    normalise(pixelCoordinates)
    {
        const minSize = Math.min(this.width, this.height)
        return {
            x: pixelCoordinates.x / minSize,
            y: pixelCoordinates.y / minSize,
        }
    }

    update()
    {
        this.pointer.delta.x = this.pointer.deltaTemp.x
        this.pointer.delta.y = this.pointer.deltaTemp.y

        this.pointer.deltaTemp.x = 0
        this.pointer.deltaTemp.y = 0
    }

    destroy() {
        this.off('debugDown')

        window.removeEventListener('keydown', this.keydownHandler)
        window.removeEventListener('keyup', this.keyupHandler)
        window.removeEventListener('pointerdown', this.pointerdownHandler)
        window.removeEventListener('pointermove', this.pointermoveHandler)
        window.removeEventListener('pointerup', this.pointerupHandler)

        this.keys = null
        this.pointer = null
        this.pause = null

    }
}