namespace SpriteKind {
    export const Snake = SpriteKind.create()
    export const Powerup = SpriteKind.create()
    export const BananaPlus = SpriteKind.create()
    export const mushroom = SpriteKind.create()
    export const Heart = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Snake, function (sprite, otherSprite) {
    if (Monkey.vy > 0) {
        music.knock.play()
        scene.cameraShake(4, 300)
        controller.vibrate(500)
        Monkey.vy = -150
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -30
    } else {
        if (Invicible == 1) {
            if (Twice == 0) {
                info.startCountdown(4)
                Twice = 1
            }
        } else {
            if (Invicible == 0) {
                info.changeLifeBy(-1)
                Invicible = 1
                Twice = 0
            } else {
                Twice = 1
            }
        }
    }
})
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    Snake.vy = 100
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Powerup, function (sprite, otherSprite) {
    otherSprite.destroy()
    Power_Up = 1
    music.powerUp.play()
    game.showLongText("Power up activated", DialogLayout.Bottom)
    game.showLongText("Jump height increased", DialogLayout.Bottom)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    game.showLongText("Enemy tips", DialogLayout.Bottom)
    game.showLongText("Snake: To defeat jump on its head or throw a banana.", DialogLayout.Bottom)
    if (game.ask("Continue?")) {
        game.showLongText("Mushrooms: You can't kill mushrooms, just try avoiding them", DialogLayout.Bottom)
        if (game.ask("Continue?")) {
            game.showLongText("Spikes: If you land on a spike it will kill you", DialogLayout.Bottom)
        } else {
        	
        }
    } else {
    	
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Throw == 0) {
        animation.runImageAnimation(
        Monkey,
        [img`
            . . . . f f f f f . . . . . . . 
            . . . f e e e e e f . . . . . . 
            . . f d d d d e e e f . . . . . 
            . c d f d d f d e e f f . . . . 
            . c d f d d f d e e d d f . . . 
            c d e e d d d d e e b d c . . . 
            c d d d d c d d e e b d c . . . 
            c c c c c d d e e e f c . . . . 
            . f d d d d e e e f f . . . . . 
            . . f f f f f e e e e f . . . . 
            . . . . f f e e e e e e f . f f 
            . . . f e e f e e f e e f . e f 
            . . f e e f e e f e e e f . e f 
            . f b d f d b f b b f e f f e f 
            . f d d f d d f d d b e f f f f 
            . . f f f f f f f f f f f f f . 
            `,img`
            . . . . f f f f f . . . . . . . 
            . . . f e e e e e f . . . . . . 
            . . f d d d d e e e f . . . . . 
            . c d f d d f d e e f f . . . . 
            . c d f d d f d e e d d f . . . 
            c d e e d d d d e e b d c . . . 
            c d d d d c d d e e b d c . . . 
            c c c c c d d e e e f c . . . . 
            . f d d d d e e e f f . . . . . 
            . . f e e e f f e e e f . . . . 
            . . f f f f f e e e e e f . f f 
            . . f d b f e e f f e e f . e f 
            . f f d d f e f f e e e f . e f 
            . f f f f f f e b b f e f f e f 
            . f d d f e e e d d b e f f f f 
            . . f f f f f f f f f f f f f . 
            `,img`
            . . . . . f f f f f . . . . . . 
            . . . . f e e e e e f . . . . . 
            . . . f d d d d d e e f . . . . 
            . . f f f d d f f d e f f . . . 
            . c d d e e d d d d e d d f . . 
            . c c d d d d c d d e d f f f . 
            . c d c c c c d d d e d f b d f 
            . . c d d d d d d e e f f d d f 
            . . . c d d d d e e f f e f f f 
            . . . . f f f e e f e e e f . . 
            . . . . f e e e e e e e f f f . 
            . . . f e e e e e e f f f e f . 
            . . f f e e e e f f f f f e f . 
            . f b d f e e f b b f f f e f . 
            . f d d f e e f d d b f f f f . 
            . f f f f f f f f f f f f f . . 
            `,img`
            . . . . . f f f f f . . . . . . 
            . . . . f e e e e e f . . . . . 
            . . . f d d d d d d e f . . . . 
            . . f d f f d d f f d f f . . . 
            . c d d d e e d d d d e d f . . 
            . c d c d d d d c d d e f f . . 
            . c d d c c c c d d d e f f f f 
            . . c d d d d d d d e f f b d f 
            . . . c d d d d e e f f f d d f 
            . . . . f f f e e f e e e f f f 
            . . . . f e e e e e e e f f f . 
            . . . f e e e e e e f f f e f . 
            . . f f e e e e f f f f f e f . 
            . f b d f e e f b b f f f e f . 
            . f d d f f f f d d b f f f f . 
            . f f f f f f f f f f f f f . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f . . . . . . . 
            . . . f e e e e e f . . . . . . 
            . . f d d d d e e e f . . . . . 
            . . f d d d d d e e f f . . . . 
            . c d d d f f d e e d d f . . . 
            c d e e d d d d e e b d c . . . 
            c f f d d c d d e e b d c . . . 
            f d d f e f f f e e e f . . . . 
            f d d f e e e f f f f f . . . . 
            f f f f f e e e e e f f . f f . 
            . f f f e f f e e e f f . e f . 
            . f b d f e f f b b f f f e f . 
            . f d d f e e f d d b f f e f . 
            . f f f f f f f f f f f f f . . 
            `,img`
            . . . . f f f f f . . . . . . . 
            . . . f e e e e e f . . . . . . 
            . . f d d d d e e e f . . . . . 
            . . f d d f d d e e f f . . . . 
            . c d d d f d d e e d d f . . . 
            c d e e d d d d e e b d c . . . 
            c d d d d c d d e e b d c . . . 
            c f f f f d d d e e f c f . . . 
            . f b d f f f e e e e f . . . . 
            . f d d f e f f f e e f . . . . 
            . . f f f e e e e f f f . f f . 
            . . f e e f e e e e f f . e f . 
            . f f e e e f f f f f f f e f . 
            . f b d f e e f b b f f f e f . 
            . f d d f f e e d d b f f f f . 
            . f f f f f f f f f f f f f . . 
            `],
        100,
        false
        )
        if (info.score() > 0) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . f f f . . . . . 
                . . . . . . f f 5 5 5 f . . . . 
                . . . . . f 5 5 5 5 5 5 f . . . 
                . . . . f 5 5 5 5 5 5 5 5 f . . 
                . . . . f 5 5 5 5 5 5 5 5 f . . 
                . . f f f f f f f d 5 5 5 5 f . 
                . . f e f . . . . f d 5 5 5 f . 
                . . f f f . . . . f d 5 5 5 f . 
                . . . . . . . . . . f d 5 5 f . 
                . . . . . . . . . . f d 5 f f . 
                . . . . . . . . . . . f 5 f . . 
                . . . . . . . . . . . f f . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, Monkey, -200, 0)
            info.changeScoreBy(-1)
        }
    }
    if (Throw == 1) {
        animation.runImageAnimation(
        Monkey,
        [img`
            . . . . . . . f f f f f . . . . 
            . . . . . . f e e e e e f . . . 
            . . . . . f e e e d d d d f . . 
            . . . . f f e e d f d d f d c . 
            . . . f d d e e d f d d f d c . 
            . . . c d b e e d d d d e e d c 
            . . . c d b e e d d c d d d d c 
            . . . . c f e e e d d c c c c c 
            . . . . . f f e e e d d d d f . 
            . . . . f e e e e f f f f f . . 
            f f . f e e e e e e f f . . . . 
            f e . f e e f e e f e e f . . . 
            f e . f e e e f e e f e e f . . 
            f e f f e f b b f b d f d b f . 
            f f f f e b d d f d d f d d f . 
            . f f f f f f f f f f f f f . . 
            `,img`
            . . . . . . . f f f f f . . . . 
            . . . . . . f e e e e e f . . . 
            . . . . . f e e e d d d d f . . 
            . . . . f f e e d f d d f d c . 
            . . . f d d e e d f d d f d c . 
            . . . c d b e e d d d d e e d c 
            . . . c d b e e d d c d d d d c 
            . . . . c f e e e d d c c c c c 
            . . . . . f f e e e d d d d f . 
            . . . . f e e e f f e e e f . . 
            f f . f e e e e e f f f f f . . 
            f e . f e e f f e e f b d f . . 
            f e . f e e e f f e f d d f f . 
            f e f f e f b b e f f f f f f . 
            f f f f e b d d e e e f d d f . 
            . f f f f f f f f f f f f f . . 
            `,img`
            . . . . . . f f f f f . . . . . 
            . . . . . f e e e e e f . . . . 
            . . . . f e e d d d d d f . . . 
            . . . f f e d f f d d f f f . . 
            . . f d d e d d d d e e d d c . 
            . f f f d e d d c d d d d c c . 
            f d b f d e d d d c c c c d c . 
            f d d f f e e d d d d d d c . . 
            f f f e f f e e d d d d c . . . 
            . . f e e e f e e f f f . . . . 
            . f f f e e e e e e e f . . . . 
            . f e f f f e e e e e e f . . . 
            . f e f f f f f e e e e f f . . 
            . f e f f f b b f e e f d b f . 
            . f f f f b d d f e e f d d f . 
            . . f f f f f f f f f f f f f . 
            `,img`
            . . . . . . f f f f f . . . . . 
            . . . . . f e e e e e f . . . . 
            . . . . f e d d d d d d f . . . 
            . . . f f d f f d d f f d f . . 
            . . f d e d d d d e e d d d c . 
            . . f f e d d c d d d d c d c . 
            f f f f e d d d c c c c d d c . 
            f d b f f e d d d d d d d c . . 
            f d d f f f e e d d d d c . . . 
            f f f e e e f e e f f f . . . . 
            . f f f e e e e e e e f . . . . 
            . f e f f f e e e e e e f . . . 
            . f e f f f f f e e e e f f . . 
            . f e f f f b b f e e f d b f . 
            . f f f f b d d f f f f d d f . 
            . . f f f f f f f f f f f f f . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f f f f . . . . 
            . . . . . . f e e e e e f . . . 
            . . . . . f e e e d d d d f . . 
            . . . . f f e e d d d d d f . . 
            . . . f d d e e d f f d d d c . 
            . . . c d b e e d d d d e e d c 
            . . . c d b e e d d c d d f f c 
            . . . . f e e e f f f e f d d f 
            . . . . f f f f f e e e f d d f 
            . f f . f f e e e e e f f f f f 
            . f e . f f e e e f f e f f f . 
            . f e f f f b b f f e f d b f . 
            . f e f f b d d f e e f d d f . 
            . . f f f f f f f f f f f f f . 
            `,img`
            . . . . . . . f f f f f . . . . 
            . . . . . . f e e e e e f . . . 
            . . . . . f e e e d d d d f . . 
            . . . . f f e e d d f d d f . . 
            . . . f d d e e d d f d d d c . 
            . . . c d b e e d d d d e e d c 
            . . . c d b e e d d c d d d d c 
            . . . f c f e e d d d f f f f c 
            . . . . f e e e e f f f d b f . 
            . . . . f e e f f f e f d d f . 
            . f f . f f f e e e e f f f . . 
            . f e . f f e e e e f e e f . . 
            . f e f f f f f f f e e e f f . 
            . f e f f f b b f e e f d b f . 
            . f f f f b d d e e f f d d f . 
            . . f f f f f f f f f f f f f . 
            `],
        100,
        false
        )
        if (info.score() > 0) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . f f f . . . . . . . . . 
                . . . f 5 5 5 f f . . . . . . . 
                . . f 5 5 5 5 5 5 f . . . . . . 
                . f 5 5 5 5 5 5 5 5 f . . . . . 
                . f 5 5 5 5 5 5 5 5 f . . . . . 
                f 5 5 5 5 d f f f f f f f . . . 
                f 5 5 5 d f . . . . f e f . . . 
                f 5 5 5 d f . . . . f f f . . . 
                f 5 5 d f . . . . . . . . . . . 
                f f 5 d f . . . . . . . . . . . 
                . f 5 f . . . . . . . . . . . . 
                . . f f . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, Monkey, 200, 0)
            info.changeScoreBy(-1)
        }
    }
})
function Go_to_start () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        console.logValue("monkeylocation", 0)
        tiles.placeOnTile(Monkey, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Monkey.vy == 0) {
        if (Power_Up == 1) {
            Monkey.vy = -230
        } else {
            Monkey.vy = -190
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BananaPlus, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.showLongText("Power up activated", DialogLayout.Bottom)
    game.showLongText("Plus Four Bananas", DialogLayout.Bottom)
    info.changeScoreBy(4)
    music.powerUp.play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Throw = 0
    animation.runImageAnimation(
    Monkey,
    [img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . f f 
        c c c c c d d d e e f c . f e f 
        . f d d d d d e e f f . . f e f 
        . . f f f f f e e e e f . f e f 
        . . . . f e e e e e e e f f e f 
        . . . f e f f e f e e e e f f . 
        . . . f e f f e f e e e e f . . 
        . . . f d b f d b f f e f . . . 
        . . . f d d c d d b b d f . . . 
        . . . . f f f f f f f f f . . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        c d e e d d d d e e d d f . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e b d c . f f 
        . f d d d d e e e f f c . f e f 
        . f f f f f f e e e e f . f e f 
        . f f f f e e e e e e e f f e f 
        f d d f d d f e f e e e e f f . 
        f d b f d b f e f e e e e f . . 
        f f f f f f f f f f f f e f . . 
        . . . . . . . . . f c d d f . . 
        . . . . . . . . . . f f f f . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f f . . . . 
        . c d d d d d d e e d d f . . . 
        . c d f d d f d e e b d c . . . 
        c d d f d d f d e e b d c . f f 
        c d e e d d d d e e f c . f e f 
        c d d d d c d e e e f . . f e f 
        . f c c c d e e e f f . . f e f 
        . . f f f f f e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . f f e f e e f e e e e f . . 
        . f e f f e e f f f e e e f . . 
        f d d b d d c f f f f f f b f . 
        f d d c d d d f . . f c d d f . 
        . f f f f f f f . . . f f f . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f f f . . . . 
        . . f d d d e e e e d d f . . . 
        . c d d d d d e e e b d c . . . 
        . c d d d d d d e e b d c . . . 
        c d d f d d f d e e f c . f f . 
        c d d f d d f d e e f . . f e f 
        c d e e d d d d e e f . . f e f 
        . f d d d c d e e f f . . f e f 
        . . f f f d e e e e e f . f e f 
        . . . . f e e e e e e e f f f . 
        . . . . f f e e e e e b f f . . 
        . . . f e f f e e c d d f f . . 
        . . f d d b d d c f f f . . . . 
        . . f d d c d d d f f . . . . . 
        . . . f f f f f f f . . . . . . 
        `,img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . . . 
        c c c c c d d e e e f c . . . . 
        . f d d d d e e e f f . . . . . 
        . . f f f f f e e e e f . . . . 
        . . . . f f e e e e e e f . f f 
        . . . f e e f e e f e e f . e f 
        . . f e e f e e f e e e f . e f 
        . f b d f d b f b b f e f f e f 
        . f d d f d d f d d b e f f f f 
        . . f f f f f f f f f f f f f . 
        `],
    100,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    music.powerUp.play()
    otherSprite.destroy(effects.hearts, 500)
    info.setLife(6)
    Go_to_start()
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.runImageAnimation(
    Monkey,
    [img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        f f . c d b e e d d c d d d d c 
        f e f . c f e e d d d c c c c c 
        f e f . . f f e e d d d d d f . 
        f e f . f e e e e f f f f f . . 
        f e f f e e e e e e e f . . . . 
        . f f e e e e f e f f e f . . . 
        . . f e e e e f e f f e f . . . 
        . . . f e f f b d f b d f . . . 
        . . . f d b b d d c d d f . . . 
        . . . f f f f f f f f f . . . . 
        `],
    200,
    false
    )
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.runImageAnimation(
    Monkey,
    [img`
        . . . . f f f f f . . . . . . . 
        . . . f e e e e e f . . . . . . 
        . . f d d d d e e e f . . . . . 
        . c d f d d f d e e f f . . . . 
        . c d f d d f d e e d d f . . . 
        c d e e d d d d e e b d c . . . 
        c d d d d c d d e e b d c . f f 
        c c c c c d d d e e f c . f e f 
        . f d d d d d e e f f . . f e f 
        . . f f f f f e e e e f . f e f 
        . . . . f e e e e e e e f f e f 
        . . . f e f f e f e e e e f f . 
        . . . f e f f e f e e e e f . . 
        . . . f d b f d b f f e f . . . 
        . . . f d d c d d b b d f . . . 
        . . . . f f f f f f f f f . . . 
        `],
    200,
    false
    )
})
info.onCountdownEnd(function () {
    Invicible = 0
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
function Make_Mushrooms () {
    for (let value of tiles.getTilesByType(sprites.castle.tileDarkGrass2)) {
        console.logValue("mushroomslocation", 0)
        mushrooms = sprites.create(img`
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 1 1 b b c c . 
            . . b 1 1 3 3 3 3 3 1 1 3 3 c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 3 3 3 3 3 3 3 c c c b b f 
            . c 3 3 3 3 3 b b b b c c c b f 
            c 3 3 3 3 b b d d d d d c c b f 
            c 3 3 c b d d d d d d c d c c . 
            f 3 c c c d d c d d d c d b c . 
            f b c c c d d d c d d d d d f . 
            f b c c c d d d d d b b b d f . 
            f f b b c b d d d d d d d c . . 
            . f f f f b c c d d d d f f . . 
            . . f b d d b c c f f b b f f . 
            . . f d d d b . . f f b b b f . 
            `, SpriteKind.mushroom)
        tiles.placeOnTile(mushrooms, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        mushrooms.vx = -50
        animation.runImageAnimation(
        mushrooms,
        [img`
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 1 1 b b c c . 
            . . b 1 1 3 3 3 3 3 1 1 3 b c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 3 3 3 3 3 b c c c c b b f 
            . c 3 3 3 3 b b d d d c c c b f 
            c b 3 3 b b d d d d d d b c b f 
            c 3 3 c b d d d d d d c d b c . 
            f 3 c c c d d c d d d c d d c . 
            f b c c c d d d c d d d d d f . 
            f b c c c f f b d d b b b d f . 
            f f b b f b d d b d d d d c . . 
            . f f f f d d b b d d d c . . . 
            . . . . b b b b f b b f f . . . 
            . . . . . . . f f b b b f . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 1 1 b b c c . 
            . . b 1 1 3 3 3 3 1 1 1 3 c c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 1 1 3 3 b b c c c c b b f 
            . c c 3 3 b b d d d d b c c b f 
            c b 3 3 b b d d d d d d d c b f 
            c 3 3 b b d d d d d d c d d c . 
            f 3 3 c b d d c d d d c d d c . 
            f b c c c d d d c d d d d d f . 
            f b c c c d d f f b b b b d f . 
            f f b b c c f b d d b d d c . . 
            . f f f c c f d d b b d c . . . 
            . . . . . . b b b b f c . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 3 1 1 b c c . 
            . . b 3 3 3 3 3 3 1 1 1 3 c c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 1 1 3 3 3 b c c c c b b f 
            . c c 3 3 3 b b d d d c c c b f 
            c b 3 3 b b d d d d d d b c b f 
            c 3 3 c b d d d d d d d d b c . 
            f 3 c c c d d d d d d c c d c . 
            f b c c c d d c c d d d d d f . 
            f b c c c d d d d d b b b d f . 
            f f b b c f f b d d d d d c . . 
            . f f f f d d b b d d d b f . . 
            . . . . f d d d b c c f f f . . 
            `,img`
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 1 1 b b c c . 
            . . b 1 1 3 3 3 3 3 1 1 3 3 c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 3 3 3 3 3 3 3 c c c b b f 
            . c 3 3 3 3 3 b b b b c c c b f 
            c 3 3 3 3 b b d d d d d c c b f 
            c 3 3 c b d d d d d d c d c c . 
            f 3 c c c d d c d d d c d b c . 
            f b c c c d d d c d d d d d f . 
            f b c c c d d d d d b b b d f . 
            f f b b c b d d d d d d d c . . 
            . f f f f b c c d d d d f f . . 
            . . f b d d b c c f f b b f f . 
            . . f d d d b . . f f b b b f . 
            `],
        100,
        true
        )
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Throw = 1
    animation.runImageAnimation(
    Monkey,
    [img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        f f . c d b e e d d c d d d d c 
        f e f . c f e e d d d c c c c c 
        f e f . . f f e e d d d d d f . 
        f e f . f e e e e f f f f f . . 
        f e f f e e e e e e e f . . . . 
        . f f e e e e f e f f e f . . . 
        . . f e e e e f e f f e f . . . 
        . . . f e f f b d f b d f . . . 
        . . . f d b b d d c d d f . . . 
        . . . f f f f f f f f f . . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . . f e e d f d d f d c . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        f f . c d b e e e d d c c c c c 
        f e f . c f f e e e d d d d f . 
        f e f . f e e e e f f f f f f . 
        f e f f e e e e e e e f f f f . 
        . f f e e e e f e f d d f d d f 
        . . f e e e e f e f b d f b d f 
        . . f e f f f f f f f f f f f f 
        . . f d d c f . . . . . . . . . 
        . . f f f f . . . . . . . . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . f f e e e d d d d f . . 
        . . . f d d e e d d d d d d c . 
        . . . c d b e e d f d d f d c . 
        f f . c d b e e d f d d f d d c 
        f e f . c f e e d d d d e e d c 
        f e f . . f e e e d c d d d d c 
        f e f . . f f e e e d c c c f . 
        f e f . f e e e e f f f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f e e e e f e e f e f f . . 
        . . f e e e f f f e e f f e f . 
        . f b f f f f f f c d d b d d f 
        . f d d c f . . f d d d c d d f 
        . . f f f . . . f f f f f f f . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . f f f e e e e e f . . . 
        . . . f d d e e e e d d d f . . 
        . . . c d b e e e d d d d d c . 
        . . . c d b e e d d d d d d c . 
        . f f . c f e e d f d d f d d c 
        f e f . . f e e d f d d f d d c 
        f e f . . f e e d d d d e e d c 
        f e f . . f f e e d c d d d f . 
        f e f . f e e e e e d f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f f b e e e e e f f . . . . 
        . . f f d d c e e f f e f . . . 
        . . . . f f f c d d b d d f . . 
        . . . . . f f d d d c d d f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e e f f f f f . . 
        f f . f e e e e e e f f . . . . 
        f e . f e e f e e f e e f . . . 
        f e . f e e e f e e f e e f . . 
        f e f f e f b b f b d f d b f . 
        f f f f e b d d f d d f d d f . 
        . f f f f f f f f f f f f f . . 
        `],
    100,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.mushroom, function (sprite, otherSprite) {
    if (Invicible == 1) {
        if (Twice == 0) {
            info.startCountdown(4)
            Twice = 1
        }
    } else {
        if (Invicible == 0) {
            info.changeLifeBy(-1)
            Invicible = 1
            Twice = 0
        } else {
            Twice = 1
        }
    }
})
function Call_Banannas () {
    for (let value of tiles.getTilesByType(sprites.swamp.swampTile3)) {
        console.logValue("banannaloctation", 0)
        Bananna = sprites.create(img`
            . . . . . f f f . . . . . . . . 
            . . . . . f e f . . . . . . . . 
            . . . f f f f f . . . . . . . . 
            . . f 5 5 f . . . . . . . . . . 
            . f 5 5 5 f . . . . . . . . . . 
            . f 5 5 5 f . . . . . . . . . . 
            f 5 5 5 5 f . . . . . . . . . . 
            f 5 5 5 5 d f f . . . . . . . . 
            f 5 5 5 5 5 d d f f . . . . . . 
            . f 5 5 5 5 5 5 d d f f . . . . 
            . . f 5 5 5 5 5 5 5 5 f . . . . 
            . . . f f 5 5 5 5 f f . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(Bananna, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
function Make_Enemys_snake () {
    for (let value of tiles.getTilesByType(sprites.castle.tilePath5)) {
        console.logValue("snakeloctation", 0)
        Snake = sprites.create(img`
            . . . . c c c c c c . . . . . . 
            . . . c 6 7 7 7 7 6 c . . . . . 
            . . c 7 7 7 7 7 7 7 7 c . . . . 
            . c 6 7 7 7 7 7 7 7 7 6 c . . . 
            . c 7 c 6 6 6 6 c 7 7 7 c . . . 
            . f 7 6 f 6 6 f 6 7 7 7 f . . . 
            . f 7 7 7 7 7 7 7 7 7 7 f . . . 
            . . f 7 7 7 7 6 c 7 7 6 f c . . 
            . . . f c c c c 7 7 6 f 7 7 c . 
            . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
            . c 7 7 2 7 7 c f c 6 7 7 6 c c 
            c 1 1 1 1 7 6 f c c 6 6 6 c . . 
            f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
            f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
            . f 6 1 1 1 1 1 1 6 6 6 f . . . 
            . . c c c c c c c c c f . . . . 
            `, SpriteKind.Snake)
        statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar.attachToSprite(Snake)
        tiles.placeOnTile(Snake, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        Snake.vx = 50
        animation.runImageAnimation(
        Snake,
        [img`
            . . . . c c c c c c . . . . . . 
            . . . c 6 7 7 7 7 6 c . . . . . 
            . . c 7 7 7 7 7 7 7 7 c . . . . 
            . c 6 7 7 7 7 7 7 7 7 6 c . . . 
            . c 7 c 6 6 6 6 c 7 7 7 c . . . 
            . f 7 6 f 6 6 f 6 7 7 7 f . . . 
            . f 7 7 7 7 7 7 7 7 7 7 f . . . 
            . . f 7 7 7 7 6 c 7 7 6 f c . . 
            . . . f c c c c 7 7 6 f 7 7 c . 
            . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
            . c 7 7 2 7 7 c f c 6 7 7 6 c c 
            c 1 1 1 1 7 6 f c c 6 6 6 c . . 
            f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
            f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
            . f 6 1 1 1 1 1 1 6 6 6 f . . . 
            . . c c c c c c c c c f . . . . 
            `,img`
            . . . c c c c c c . . . . . . . 
            . . c 6 7 7 7 7 6 c . . . . . . 
            . c 7 7 7 7 7 7 7 7 c . . . . . 
            c 6 7 7 7 7 7 7 7 7 6 c . . . . 
            c 7 c 6 6 6 6 c 7 7 7 c . . . . 
            f 7 6 f 6 6 f 6 7 7 7 f . . . . 
            f 7 7 7 7 7 7 7 7 7 7 f . . . . 
            . f 7 7 7 7 6 c 7 7 6 f . . . . 
            . . f c c c c 7 7 6 f c c c . . 
            . . c 6 2 7 7 7 f c c 7 7 7 c . 
            . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
            . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
            . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
            . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
            . . c 6 1 1 1 1 1 7 6 6 c c . . 
            . . . c c c c c c c c c c . . . 
            `],
        100,
        true
        )
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile6`, function (sprite, location) {
    Monkey.vy = -300
    if (Invicible == 1) {
        if (Twice == 0) {
            info.startCountdown(4)
            Twice = 1
        }
    } else {
        if (Invicible == 0) {
            info.changeLifeBy(-1)
            Invicible = 1
            Twice = 0
        } else {
            Twice = 1
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Snake, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 500)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -50
})
function Make_Banana () {
    for (let value of tiles.getTilesByType(sprites.swamp.swampTile19)) {
        console.logValue("bananapluslocation", 0)
        Banana_Plus = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . 6 6 6 5 5 6 6 6 . . . . 
            . . . 7 7 7 7 6 6 6 6 6 6 . . . 
            . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
            . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
            . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
            . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
            . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
            . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
            . . . 6 8 8 8 8 8 8 8 8 6 . . . 
            . . . . 6 6 8 8 8 8 6 6 . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.BananaPlus)
        tiles.placeOnTile(Banana_Plus, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
function Place_Power_Ups () {
    for (let value of tiles.getTilesByType(sprites.swamp.swampTile13)) {
        console.logValue("jumpingpowerlocation", 0)
        Jumping_power = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Powerup)
        tiles.placeOnTile(Jumping_power, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.baDing.play()
    info.changeScoreBy(1)
    otherSprite.destroy()
})
function extra_HEarts () {
    for (let value of tiles.getTilesByType(sprites.builtin.forestTiles10)) {
        console.logValue("heartextralocation", 0)
        Heartextra = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f . f f f f f . . 
            . . f f 3 3 3 f f f 3 3 3 f f . 
            . . f 3 3 3 3 3 f 3 3 3 3 3 f . 
            . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
            . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f f 3 3 3 b b b 3 3 3 f f . 
            . . . f f 3 b b b b b 3 f f . . 
            . . . . f f b b b b b f f . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Heart)
        tiles.placeOnTile(Heartextra, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
let Heartextra: Sprite = null
let Jumping_power: Sprite = null
let Banana_Plus: Sprite = null
let statusbar: StatusBarSprite = null
let Bananna: Sprite = null
let mushrooms: Sprite = null
let projectile: Sprite = null
let Throw = 0
let Snake: Sprite = null
let Twice = 0
let Monkey: Sprite = null
let Invicible = 0
let Power_Up = 0
controller.combos.setTimeout(3)
game.setDialogFrame(img`
    88888..8888888888888888....88888.
    87768888777877787778777888867778.
    87777686767876767678767688777778.
    87767767667676676676766786776768.
    8677676767767767677677678676778..
    .877768777686767776867678667768..
    .886668888888888888888888886688..
    .888888866666666666666668877768..
    88677786666666666666666668766778.
    87766686666666666666666668776678.
    87667786666666666666666668677778.
    87777686666666666666666668866888.
    88866886666666666666666668677778.
    87777686666666666666666668776678.
    87667786666666666666666668666778.
    87766786666666666666666668777688.
    88677786666666666666666668766778.
    87766686666666666666666668776678.
    87667786666666666666666668677778.
    87777686666666666666666668866888.
    88866886666666666666666668677778.
    87777686666666666666666668776678.
    87667786666666666666666668666778.
    87766786666666666666666668777688.
    .867778866666666666666668888888..
    .886688888888888888888888866688..
    .867766876768677767686777867778..
    .8776768767767767677677676767768.
    86767768766767667667676676776778.
    87777788676787676767876768677778.
    87776888877787778777877788886778.
    88888..88888888888888888....8888.
    .................................
    `)
game.setDialogCursor(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . f f 
    c c c c c d d d e e f c . f e f 
    . f d d d d d e e f f . . f e f 
    . . f f f f f e e e e f . f e f 
    . . . . f e e e e e e e f f e f 
    . . . f e f f e f e e e e f f . 
    . . . f e f f e f e e e e f . . 
    . . . f d b f d b f f e f . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `)
Power_Up = 0
Invicible = 0
info.setScore(0)
info.setLife(4)
scene.setBackgroundImage(img`
    5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555...
    5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
    5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
    5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
    5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
    555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555dddddd5555555555555555555555555
    5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555dddddddddd55555555555555555555555
    55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555dddddddddddddd555555555555555555555
    5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555dddddddddddddddd55555555555555555555
    555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555dddddddddddddddddd5555555555555555555
    555555555555555555555555555ddddddddd55555555555555555555555555555555555555555555555555555555555555555555555555555555555555dddddddddddddddddddd555555555555555555
    555555555555555555555555ddddddddddddddd55555555555555555555555555555555555555555555555555555555555555555555555555555555555dddddddddddddddddddd555555555555555555
    5555555555555555555555ddddddddddddddddddd55555555555555555555555555555555555555555555555555555555555555555555555555555555dddddddddddddddddddddd55555555555555555
    55555555555555555555ddddddddddddddddddddddd55555555555555555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddd55555555555555555
    555555555555555555ddddddddddddddddddddddddddd555555555555555555555555555555555555555555555555555555555555555555555555555dddddddddddddddddddddddd5555555555555555
    5555555555555555dddddddddddddddddddddddddddddd5555555555555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddd5555555555555555
    555555555555555dddddddddddddddddddddddddddddddd555555555555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddd5555555555555555
    55555555555555dddddddddddddddddddddddddddddddddd5555555555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddddd555555555555555
    5555555555555dddddddddddddddddddddddddddddddddddd555555555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddddd555555555555555
    555555555555dddddddddddddddddddddddddddddddddddddd5555555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddddddd55555555555555
    55555555555dddddddddddddddddddddddddddddddddddddddd555555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddddddd55555555555555
    5555555555dddddddddddddddddddddddddddddddddddddddddd55555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddddddd55555555555555
    555555555dddddddddddddddddddddddddddddddddddddddddddd555555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddddddddd5555555555555
    555555555ddddddddddddddddddddddddddddddddddddddddddddd55555555555555555555555555555555555555555555555555555555555555ddddddddddddddddddddddddddddddd5555555555555
    55555555ddddddddddddddddddddddddddddddddddddddddddddddd55555555555555555555555555ddddddddd5555555555555555555555555ddddddddddddddddddddddddddddddddd555555555555
    55555555ddddddddddddddddddddddddddddddddddddddddddddddd555555555555555555555555ddddddddddddd55555555555555555555555ddddddddddddddddddddddddddddddddd555555555555
    5555555ddddddddddddddddddddddddddddddddddddddddddddddddd555555555555555555555ddddddddddddddddd555555555555555555555dddddddddddddddddddddddddddddddddd55555555555
    5555555ddddddddddddddddddddddddddddddddddddddddddddddddd55555555555555555555ddddddddddddddddddd5555555555555555555ddddddddddddddddddddddddddddddddddd55555555555
    555555ddddddddddddddddddddddddddddddddddddddddddddddddddd555555555555555555ddddddddddddddddddddd55555555555555555ddddddddddddddddddddddddddddddddddddd5555555555
    55555ddddddddddddddddddddddddddddddddddddddddddddddddddddd5555555555555555ddddddddddddddddddddddd555555555555555dddddddddddddddddddddddddddddddddddddd5555555555
    d555dddddddddddddddddddddddddddddddddddddddddddddddddddddd555555555555555dddddddddddddddddddddddd555555555555555ddddddddddddddddddddddddddddddddddddddd555555555
    d55dddddddddddddddddddddddddddddddddddddddddddddddddddddddd5555555555555dddddddddddddddddddddddddd555555555555dddddddddddddddddddddddddddddddddddddddddd55555555
    d5dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd55555555555dddddddddddddddddddddddddddd55555555555ddddddddddddddddddddddddddddddddddddddddddd5555555
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd5555555555dddddddddddddddddddddddddddddd55555555ddddddddddddddddddddddddddddddddddddddddddddddd5555d
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd55555555ddddddddddddddddddddddddddddddddd5555dddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd5555ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddd36666663dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd36666663ddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddd366666677733dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd366666677733ddddddddddddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddddd336667733ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd336667733dddddddddddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddddd36666677773ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd36666677773dddddddddddddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddddd66666666666773ddd333333ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd66666666666773ddd333333dddddddddddddddddddddddddddddddddddddddddd
    ddddddddddddd3677777777766673d6677777733ddddddddddddddddddddddddddddddddddddddddddddddddddddd3677777777766673d6677777733dddddddddddddddddddddddddddddddddddddddd
    dddddddddddd667767776777766763677767667733dddddddddddddddddddddddddddddddddddddddddddddddddd667767776777766763677767667733dddddddddddddddddddddddddddddddddddddd
    ddddddddddd67777676767767766666667676676773dddddddddddddddddddddddddddddddddddddddddddddddd67777676767767766666667676676773ddddddddddddddddddddddddddddddddddddd
    dddddddddd6776676667667667766666666666666673dddddddddddddddddddddddddddddddddddddddddddddd6776676667667667766666666666666673dddddddddddddddddddddddddddddddddddd
    ddddddddd677766666633666667766777776666666733dddddddddddddddddddddddddddddddddddddddddddd677766666633666667766777776666666733ddddddddddddddddddddddddddddddddddd
    ddddddddd676766636dd6666666667766677766666673ddddddddddddd3366663dddddddddddddddddddddddd676766636dd6666666667766677766666673ddddddddddddd3366663ddddddddddddddd
    dddddddd67766636ddd67776666666666776777663676dddddddddddd337666ddddddddddddddddddddddddd67766636ddd67776666666666776777663676dddddddddddd337666ddddddddddddddddd
    ddddddd6776636d3ddd33676777766666767777763366ddddddddddd3376633dddddddddddddddddddddddd6776636d3ddd33676777766666767777763366ddddddddddd3376633ddddddddddddddddd
    ddddddd67666d3ddd667766666677666d667777766d36ddddddddddd3766666663ddddddddddddddddddddd67666d3ddd667766666677666d667777766d36ddddddddddd3766666663dddddddddddddd
    ddddddd67366ddddd677776777667666d677677776dd3dddd336666d3766677777663dddddddddddddddddd67366ddddd677776777667666d677677776dd3dddd336666d3766677777663ddddddddddd
    ddddddd66d66ddddd336666667766666d676777776dddddd37777666766676666777666dddddddddddddddd66d66ddddd336666667766666d676777776dddddd377776667666766667776666dddddddd
    dddddddddddddddd3777677767736666dd63766776ddddd3776667667667666666777766dddddddddddddddddddddddd3777677767736666dd63766776ddddd37766676676676666667777666ddddddd
    ddddddddddddddd67766777776736666dddd667776dddd666666666666676663667767766dddddddddddddddddddddd67766777776736666dddd667776dddd6666666666666766636677677666dddddd
    ddddddddddddddd67666776676636666dddd677776dddd63366666666667666d6367677766ddddddddddddddddddddd67666776676636666dddd677776dddd63366666666667666d63676777666ddddd
    ddddddddddddddd67776677673dd6663dddd376776ddddd3677776677666663d3d666767766ddd333dddddddddddddd67776677673dd6663dddd376776ddddd3677776677666663d3d666767766ddd33
    d3dddddddddddd67766676736ddd666ddddd366763ddddd677766677677766dddd366366766dd37773dddddddddddd67766676736ddd666ddddd366763ddddd677766677677766dddd366366766dd377
    673dd333dddddd6766667673dddd666ddddddd376ddddd6776766666676776ddddd66d66666d3766673dd333dddddd6766667673dddd666ddddddd376ddddd6776766666676776ddddd66d66666d3766
    6766377763dddd676776736ddddd666ddddddd363dddd677766667776666763ddddddd33666366666766377763dddd676776736ddddd666ddddddd363dddd677766667776666763ddddddd3366636666
    66667766763ddd36776673dddddd663ddddddddddddd3776736677666777666ddddddddd6337777666667766763ddd36776673dddddd663ddddddddddddd3776736677666777666ddddddddd63377776
    66667666676dddd676366ddddddd66dddddddddddddd37666d6677776667766ddddddddd3376667776667666676dddd676366ddddddd66dddddddddddddd37666d6677776667766ddddddddd33766677
    666666666663ddd676dddddddddd66ddddddddddddd377636d66377667767663dddddddd37666666766666666663ddd676dddddddddd66ddddddddddddd377636d66377667767663dddddddd37666666
    666667777666ddd363dddddddddd66ddddddd66663d3766d3d66676666776666ddddddd376666636766667777666ddd363dddddddddd66ddddddd66663d3766d3d66676666776666ddddddd376666636
    677666767666dddddddddddddddd66dddddd3663ddd3766ddd66676766676666ddddddd376636dd6677666767666dddddddddddddddd66dddddd3663ddd3766ddd66676766676666ddddddd376636dd6
    7776667676663ddddddddddddddd66ddd666666666dd376ddd66667767633666dddddddd766d3dd67776667676663ddddddddddddddd66ddd666666666dd376ddd66667767633666ddddddd6766d3dd6
    7777636677633ddddddddddddddd66dd66666666666d37dddd6663766776dd66ddddddddd36ddd676777636677633ddddddddddddddd66dd66666666666d37dddd6663766776dd66dddddddd636ddd67
    77776d66776d3ddddddddddddddd66dd66366663d66dd3dddd666d767676dd66dddddddddd3ddd6767776d66776d3ddddddddddddddd66dd66366663d66dd3dddd666d767676dd66dddddddd6d3ddd67
    37673d63766ddddddddddddddddd66dd6d66666ddd6ddddddd666d667633dd363ddddddddddddd3667673d63766ddddddddddddddddd66dd6d66666ddd6ddddddd666d667633dd363ddddddddddddd36
    d763ddd3763ddddddddddddddddd66dd3d66d366dd3ddddddd666dd376ddddd66dddddddddddddd67763ddd3763ddddddddddddddddd66dd3d66d366dd3ddddddd666dd376ddddd66dddddddddddddd6
    d76ddddd66dddddddddddddddddd66dddd66dd66dddddddddd666ddd33ddddd663dddddddddddd67776ddddd66dddddddddddddddddd66dddd66dd66dddddddddd666ddd33ddddd663dddddddddddd67
    d76dddddd6ddddd36663dddddddd66dddd63dd36dddddddddd366dddddddddd366dddddddddddd67776dddddd6ddddd36663dddddddd66dddd63dd36dddddddddd366dddddddddd366dddddddddddd67
    d63dddddd3ddd3666663366ddddd66dddd6dddd63dddd3dddd366ddddddddddd66dddddddddddd67663dddddd3ddd3666663366ddddd66dddd6dddd63dddd3dddd366ddddddddddd66dddddddddddd67
    d6ddddddddddd3dd66666666dddd66ddddddddd63ddddd3dddd663dddddddddd663ddddddddddd3766ddddddddddd3dd66666666dddd66ddddddddd63ddddd3dddd663dddddddddd663ddddddddddd37
    d6ddddddddddddd6636666363ddd66ddddddddd36ddddd33ddd663dddddddddd366dddddddddddd366ddddddddddddd6636666363ddd66ddddddddd36ddddd33ddd663dddddddddd366dddddddddddd3
    d6dddddddddddd666d66366d6ddd66dddddddddd6dddddd33dd666ddddddddddd666dddddddddddd66dddddddddddd666d66366d6ddd66dddddddddd6dddddd33dd666ddddddddddd666dddddddddddd
    d6dddddddddddd66dd66d66d3ddd66dddddddddd63dddddd3dd666ddddddd33dd3663ddddddddddd66dddddddddddd66dd66d66d3ddd66dddddddddd63dddddd3dd666ddddddd33dd3663ddddddddddd
    dddddddddddddd6dd36dd36ddddd663ddddddddd63dddddd63d6663ddddd33dddd666dddddddddd36ddddddddddddd6dd36dd36ddddd663ddddddddd63dddddd63d6663ddddd33dddd666dddddddddd3
    dddddd333dddddddd66ddd6ddddd663ddddddddd66dddddd36d6663dddd33ddddd6666ddddddddd66ddddd333dddddddd66ddd6ddddd663ddddddddd66dddddd36d6663dddd33ddddd6666ddddddddd6
    ddddddddd33dddddd63ddd3ddddd663dddd33ddd66ddddddd636666dddd33ddddd3666dddddd3dd63dddddddd33dddddd63ddd3ddddd663dddd33ddd66ddddddd636666dddd33ddddd36666ddddd3dd6
    dddddddddd333dddd6dddddddddd666d3ddd33dd36ddd33dd363666ddd36ddddddd6666ddd33dd36dddddddddd333dddd6dddddddddd666d3ddd33dd36ddd33dd363666ddd36ddddddd6666dddd3dd36
    ddddddddddd333ddd6ddddd33ddd666dd3ddd33d36d333ddd363666ddd36dd33ddd6666ddd3ddd66ddddddddddd333ddd6ddddd33ddd666dd3ddd33d36d333ddd363666ddd36dd33ddd6666ddd33dd66
    d33ddddddddd363d36ddd33ddddd366dd33ddd6d363363d3dd66666ddd63ddd33dd36666d3dddd66d33ddddddddd363d36ddd33ddddd366dd33ddd6d363363d3dd66666ddd63ddd33dd36666dd3ddd66
    d3ddddddddddd36366dd33d3dd3dd66ddd63dd3636366d3ddd66666dd36dd3dd36dd6666d3ddd36333ddddddddddd36366dd33d3dd3dd66ddd63dd3636366d3ddd66666dd36dd3dd36dd6666d33dd363
    dddddddddddddd6666d36d3dd33dd663dd36ddd63636d33ddd66666dd66dd33d363d3666d3ddd6633ddddddddddddd6666d36d3dd33dd663dd36ddd63636d33ddd66666dd66dd33d363d366633ddd663
    3ddd33dddd33dd3663366d3d33ddd663ddd63dd3666636dddd366663d66ddd3dd363366663dd36633ddd33dddd33dd3663366d3d33ddd663ddd63dd3666636dddd366663d66ddd3dd36336666ddd3663
    6d333dddddd33dd66366d3dd33ddd666ddd66dd3666366ddddd66663d66ddd6dd36336663dd33663dd333dddddd33dd66366d3dd33ddd666ddd66dd3666366ddddd66663d66ddd6dd36336666dd33663
    d366ddd33ddd33d66363d3d333666666666666666666666666666666d66d3d63dd6336666d333633d366ddd33ddd33d66363d3d333666666666666666666666666666666d66d3d63dd63366663333633
    d66ddd33dd3d33dd6366666666666666666666666666666666666666366d3d63dd36366666336633366ddd33dd3d33dd6366666666666666666666666666666666666666366d3d63dd36366666336633
    36dd3d33ddd3d33d6666666666666666666666666666666666666666666d3366d3d636666633663366dd3d33ddd3d33d6666666666666666666666666666666666666666666d3366d3d6366666336633
    63d3d33dddd36666666666666666666666666666666666666666666666666366d3d636666663663363d3d33dddd36666666666666666666666666666666666666666666666666366d3d6366666636633
    6336d33dd6666666666666666666666666666666666666666666666666666666d3d36666666366366336d33dd6666666666666666666666666666666666666666666666666666666d3d3666666636636
    3d66d3366666666666666666666666666666666666666666666666666666666666336666666666363d66d336666666666666666666666666666666666666666666666666666666666633666666666636
    6363d6666666666666666666666666666666666666666666666666666666666666666666666666363363d666666666666666666666666666666666666666666666666666666666666666666666666636
    6666666666666666666666666666666666666666666666666666666666666666666666666666663636666666666666666666666666666666666666666666666666666666666666666666666666666636
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    .666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    `)
tiles.setCurrentTilemap(tilemap`level2`)
game.showLongText("Welcome to the game Monkey Jumper. ", DialogLayout.Full)
game.showLongText("In the game you are a monkey who collects bananas. Bananas are your weapons, press \"B\" to throw a banana once you have collected it. Special orbs called Power ups might give you more bananas or make you jump higher. Lastly press \"A\" to jump.", DialogLayout.Full)
Monkey = sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . . . 
    c c c c c d d e e e f c . . . . 
    . f d d d d e e e f f . . . . . 
    . . f e e e f f e e e f . . . . 
    . . f f f f f e e e e e f . f f 
    . . f d b f e e f f e e f . e f 
    . f f d d f e f f e e e f . e f 
    . f f f f f f e b b f e f f e f 
    . f d d f e e e d d b e f f f f 
    . . f f f f f f f f f f f f f . 
    `, SpriteKind.Player)
controller.moveSprite(Monkey, 100, 0)
Monkey.ay = 500
scene.cameraFollowSprite(Monkey)
Call_Banannas()
Make_Enemys_snake()
Go_to_start()
Place_Power_Ups()
Make_Banana()
Make_Mushrooms()
extra_HEarts()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Snake)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            animation.runImageAnimation(
            value,
            [img`
                . . . . . . c c c c c c . . . . 
                . . . . . c 6 7 7 7 7 6 c . . . 
                . . . . c 7 7 7 7 7 7 7 7 c . . 
                . . . c 6 7 7 7 7 7 7 7 7 6 c . 
                . . . c 7 7 7 c 6 6 6 6 c 7 c . 
                . . . f 7 7 7 6 f 6 6 f 6 7 f . 
                . . . f 7 7 7 7 7 7 7 7 7 7 f . 
                . . c f 6 7 7 c 6 7 7 7 7 f . . 
                . c 7 7 f 6 7 7 c c c c f . . . 
                c 7 7 7 7 f c 6 7 7 7 2 7 c . . 
                c c 6 7 7 6 c f c 7 7 2 7 7 c . 
                . . c 6 6 6 c c f 6 7 1 1 1 1 c 
                . . f 6 6 6 6 c 6 6 1 1 1 1 1 f 
                . . f c 6 6 6 6 6 1 1 1 1 1 6 f 
                . . . f 6 6 6 1 1 1 1 1 1 6 f . 
                . . . . f c c c c c c c c c . . 
                `,img`
                . . . . . . . c c c c c c . . . 
                . . . . . . c 6 7 7 7 7 6 c . . 
                . . . . . c 7 7 7 7 7 7 7 7 c . 
                . . . . c 6 7 7 7 7 7 7 7 7 6 c 
                . . . . c 7 7 7 c 6 6 6 6 c 7 c 
                . . . . f 7 7 7 6 f 6 6 f 6 7 f 
                . . . . f 7 7 7 7 7 7 7 7 7 7 f 
                . . . . f 6 7 7 c 6 7 7 7 7 f . 
                . . c c c f 6 7 7 c c c c f . . 
                . c 7 7 7 c c f 7 7 7 2 6 c . . 
                c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
                c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
                . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
                . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
                . . c c 6 6 7 1 1 1 1 1 6 c . . 
                . . . c c c c c c c c c c . . . 
                `],
            100,
            true
            )
            value.vx = 50
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            animation.runImageAnimation(
            value,
            [img`
                . . . . c c c c c c . . . . . . 
                . . . c 6 7 7 7 7 6 c . . . . . 
                . . c 7 7 7 7 7 7 7 7 c . . . . 
                . c 6 7 7 7 7 7 7 7 7 6 c . . . 
                . c 7 c 6 6 6 6 c 7 7 7 c . . . 
                . f 7 6 f 6 6 f 6 7 7 7 f . . . 
                . f 7 7 7 7 7 7 7 7 7 7 f . . . 
                . . f 7 7 7 7 6 c 7 7 6 f c . . 
                . . . f c c c c 7 7 6 f 7 7 c . 
                . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
                . c 7 7 2 7 7 c f c 6 7 7 6 c c 
                c 1 1 1 1 7 6 f c c 6 6 6 c . . 
                f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
                f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
                . f 6 1 1 1 1 1 1 6 6 6 f . . . 
                . . c c c c c c c c c f . . . . 
                `,img`
                . . . c c c c c c . . . . . . . 
                . . c 6 7 7 7 7 6 c . . . . . . 
                . c 7 7 7 7 7 7 7 7 c . . . . . 
                c 6 7 7 7 7 7 7 7 7 6 c . . . . 
                c 7 c 6 6 6 6 c 7 7 7 c . . . . 
                f 7 6 f 6 6 f 6 7 7 7 f . . . . 
                f 7 7 7 7 7 7 7 7 7 7 f . . . . 
                . f 7 7 7 7 6 c 7 7 6 f . . . . 
                . . f c c c c 7 7 6 f c c c . . 
                . . c 6 2 7 7 7 f c c 7 7 7 c . 
                . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
                . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
                . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
                . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
                . . c 6 1 1 1 1 1 7 6 6 c c . . 
                . . . c c c c c c c c c c . . . 
                `],
            100,
            true
            )
            value.vx = -50
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.mushroom)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            animation.runImageAnimation(
            value,
            [img`
                . . . . b b b b . . . . . . . . 
                . . . b 3 3 3 3 b b b b . . . . 
                . . b b 3 3 3 3 3 1 1 b b c c . 
                . . b 1 1 3 3 3 3 3 1 1 3 b c c 
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
                . . c 3 3 3 3 3 b c c c c b b f 
                . c 3 3 3 3 b b d d d c c c b f 
                c b 3 3 b b d d d d d d b c b f 
                c 3 3 c b d d d d d d c d b c . 
                f 3 c c c d d c d d d c d d c . 
                f b c c c d d d c d d d d d f . 
                f b c c c f f b d d b b b d f . 
                f f b b f b d d b d d d d c . . 
                . f f f f d d b b d d d c . . . 
                . . . . b b b b f b b f f . . . 
                . . . . . . . f f b b b f . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . b b b b . . . . . . . . 
                . . . b 3 3 3 3 b b b b . . . . 
                . . b b 3 3 3 3 3 1 1 b b c c . 
                . . b 1 1 3 3 3 3 1 1 1 3 c c c 
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
                . . c 1 1 3 3 b b c c c c b b f 
                . c c 3 3 b b d d d d b c c b f 
                c b 3 3 b b d d d d d d d c b f 
                c 3 3 b b d d d d d d c d d c . 
                f 3 3 c b d d c d d d c d d c . 
                f b c c c d d d c d d d d d f . 
                f b c c c d d f f b b b b d f . 
                f f b b c c f b d d b d d c . . 
                . f f f c c f d d b b d c . . . 
                . . . . . . b b b b f c . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . b b b b . . . . . . . . 
                . . . b 3 3 3 3 b b b b . . . . 
                . . b b 3 3 3 3 3 3 1 1 b c c . 
                . . b 3 3 3 3 3 3 1 1 1 3 c c c 
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
                . . c 1 1 3 3 3 b c c c c b b f 
                . c c 3 3 3 b b d d d c c c b f 
                c b 3 3 b b d d d d d d b c b f 
                c 3 3 c b d d d d d d d d b c . 
                f 3 c c c d d d d d d c c d c . 
                f b c c c d d c c d d d d d f . 
                f b c c c d d d d d b b b d f . 
                f f b b c f f b d d d d d c . . 
                . f f f f d d b b d d d b f . . 
                . . . . f d d d b c c f f f . . 
                `,img`
                . . . . b b b b . . . . . . . . 
                . . . b 3 3 3 3 b b b b . . . . 
                . . b b 3 3 3 3 3 1 1 b b c c . 
                . . b 1 1 3 3 3 3 3 1 1 3 3 c c 
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
                . . c 3 3 3 3 3 3 3 c c c b b f 
                . c 3 3 3 3 3 b b b b c c c b f 
                c 3 3 3 3 b b d d d d d c c b f 
                c 3 3 c b d d d d d d c d c c . 
                f 3 c c c d d c d d d c d b c . 
                f b c c c d d d c d d d d d f . 
                f b c c c d d d d d b b b d f . 
                f f b b c b d d d d d d d c . . 
                . f f f f b c c d d d d f f . . 
                . . f b d d b c c f f b b f f . 
                . . f d d d b . . f f b b b f . 
                `],
            100,
            true
            )
            value.vx = 50
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            animation.runImageAnimation(
            value,
            [img`
                . . . . . . . . b b b b . . . . 
                . . . . b b b b 3 3 3 3 b . . . 
                . c c b b 1 1 3 3 3 3 3 b b . . 
                c c b 3 1 1 3 3 3 3 3 1 1 b . . 
                c b 3 3 3 3 3 3 3 3 3 1 1 b . . 
                f b b c c c c b 3 3 3 3 3 c . . 
                f b c c c d d d b b 3 3 3 3 c . 
                f b c b d d d d d d b b 3 3 b c 
                . c b d c d d d d d d b c 3 3 c 
                . c d d c d d d c d d c c c 3 f 
                . f d d d d d c d d d c c c b f 
                . f d b b b d d b f f c c c b f 
                . . c d d d d b d d b f b b f f 
                . . . c d d d b b d d f f f f . 
                . . . f f b b f b b b b . . . . 
                . . . f b b b f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . b b b b . . . . 
                . . . . b b b b 3 3 3 3 b . . . 
                . c c b b 1 1 3 3 3 3 3 b b . . 
                c c c 3 1 1 1 3 3 3 3 1 1 b . . 
                c b 3 3 3 3 3 3 3 3 3 1 1 b . . 
                f b b c c c c b b 3 3 1 1 c . . 
                f b c c b d d d d b b 3 3 c c . 
                f b c d d d d d d d b b 3 3 b c 
                . c d d c d d d d d d b b 3 3 c 
                . c d d c d d d c d d b c 3 3 f 
                . f d d d d d c d d d c c c b f 
                . f d b b b b f f d d c c c b f 
                . . c d d b d d b f c c b b f f 
                . . . c d b b d d f c c f f f . 
                . . . . c f b b b b . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . b b b b . . . . 
                . . . . b b b b 3 3 3 3 b . . . 
                . c c b 1 1 3 3 3 3 3 3 b b . . 
                c c c 3 1 1 1 3 3 3 3 3 3 b . . 
                c b 3 3 3 3 3 3 3 3 3 1 1 b . . 
                f b b c c c c b 3 3 3 1 1 c . . 
                f b c c c d d d b b 3 3 3 c c . 
                f b c b d d d d d d b b 3 3 b c 
                . c b d d d d d d d d b c 3 3 c 
                . c d c c d d d d d d c c c 3 f 
                . f d d d d d c c d d c c c b f 
                . f d b b b d d d d d c c c b f 
                . . c d d d d d b f f c b b f f 
                . . f b d d d b b d d f f f f . 
                . . f f f c c b d d d f . . . . 
                `,img`
                . . . . . . . . b b b b . . . . 
                . . . . b b b b 3 3 3 3 b . . . 
                . c c b b 1 1 3 3 3 3 3 b b . . 
                c c 3 3 1 1 3 3 3 3 3 1 1 b . . 
                c b 3 3 3 3 3 3 3 3 3 1 1 b . . 
                f b b c c c 3 3 3 3 3 3 3 c . . 
                f b c c c b b b b 3 3 3 3 3 c . 
                f b c c d d d d d b b 3 3 3 3 c 
                . c c d c d d d d d d b c 3 3 c 
                . c b d c d d d c d d c c c 3 f 
                . f d d d d d c d d d c c c b f 
                . f d b b b d d d d d c c c b f 
                . . c d d d d d d d b c b b f f 
                . . f f d d d d c c b f f f f . 
                . f f b b f f c c b d d b f . . 
                . f b b b f f . . b d d d f . . 
                `],
            100,
            true
            )
            value.vx = -50
        }
    }
})
