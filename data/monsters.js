const emberImage = new Image()
emberImage.src = './img/emberSprite.png'

const dragonImage = new Image()
dragonImage.src = './img/dragonSprite.png'


const monsters = {
    Ember: {
        position: {
            x: 280,
            y: 325
        },
        image: {
            src: './img/emberSprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        name: 'Ember',
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    Dragon: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src: './img/dragonSprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        isEnemy: true,
        name: 'Dragon',
        attacks: [attacks.Tackle, attacks.Fireball]
    }
}