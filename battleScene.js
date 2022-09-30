const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
    position: {
    x: 0,
    y: 0
    },
    image: battleBackgroundImage
})

let dragon 

let ember 

let renderedSprites 

let battleAnimationId

let queue

function initBattle(){

    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()

    dragon = new Monster(monsters.Dragon)
    ember = new Monster(monsters.Ember)
    renderedSprites = [dragon, ember]
    
    queue = []

    ember.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })

        // event listeners for our buttons (the attacks being used)
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            ember.attack({ 
                attack: selectedAttack,
                recipient: dragon,
                renderedSprites
            })


            if(dragon.health <= 0){
                queue.push(() => {
                    dragon.faint()
                })
                queue.push(() => {
                    // fade back to black
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'

                            gsap.to('#overlappingDiv', {
                                opacity: 0
                            })

                            battle.initiated = false
                            audio.Map.play()
                        }
                    })
                })
            }

            
            // enemy attacks here
            const randomAttack = dragon.attacks[Math.floor(Math.random() * dragon.attacks.length)]

            queue.push(() => {
                dragon.attack({ 
                    attack: randomAttack,
                    recipient: ember,
                    renderedSprites
                })

                if(ember.health <= 0){
                    queue.push(() => {
                        ember.faint()
                    })
                    queue.push(() => {
                        // fade back to black
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleAnimationId)
                                animate()
                                document.querySelector('#userInterface').style.display = 'none'
    
                                gsap.to('#overlappingDiv', {
                                    opacity: 0
                                })
    
                                battle.initiated = false
                                audio.Map.play()
                            }
                        })
                    })
                }
            })
        })

        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('#attackType').innerHTML = selectedAttack.type
            document.querySelector('#attackType').style.color = selectedAttack.color
        })
    })
}

function animateBattle(){
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}

animate()
// initBattle()
// animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(queue.length > 0){
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
} )