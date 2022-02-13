namespace SpriteKind {
    export const Snake = SpriteKind.create()
    export const Powerup = SpriteKind.create()
    export const BananaPlus = SpriteKind.create()
    export const mushroom = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Snake, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BananaPlus, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.showLongText("Power up activated", DialogLayout.Bottom)
    game.showLongText("Plus Four Bananas", DialogLayout.Bottom)
    info.changeScoreBy(4)
    music.powerUp.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Powerup, function (sprite, otherSprite) {
    otherSprite.destroy()
    Power_Up = 1
    music.powerUp.play()
    game.showLongText("Power up activated", DialogLayout.Bottom)
    game.showLongText("Jump height increased", DialogLayout.Bottom)
})
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
info.onCountdownEnd(function () {
    Invicible = 0
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Monkey.vy == 0) {
        if (Power_Up == 1) {
            Monkey.vy = -230
        } else {
            Monkey.vy = -190
        }
    }
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
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
})
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    Snake.vy = 100
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.baDing.play()
    info.changeScoreBy(1)
    otherSprite.destroy()
})
let Jumping_power: Sprite = null
let Banana_Plus: Sprite = null
let projectile: Sprite = null
let Throw = 0
let statusbar: StatusBarSprite = null
let Snake: Sprite = null
let Bananna: Sprite = null
let mushrooms: Sprite = null
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
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7776677777777767777777777777777777777777777667777777776777777777777777777777777777766777777777677777777777777777777777777776677777777767777777777777777777777777
    7666777777777667777777777777777777777767766677777777766777777777777777777777776776667777777776677777777777777777777777677666777777777667777777777777777777777767
    7767766777667766777766777777777777777766776776677766776677776677777777777777776677677667776677667777667777777777777777667767766777667766777766777777777777777766
    6666667767766766776766777777777777776676666666776776676677676677777777777777667666666677677667667767667777777777777766766666667767766766776766777777777777776676
    6666677766766666766667777777777777666677666667776676666676666777777777777766667766666777667666667666677777777777776666776666677766766666766667777777777777666677
    6666676666666676666677767777776667776667666667666666667666667776777777666777666766666766666666766666777677777766677766676666676666666676666677767777776667776667
    6666666666666776677666667766677766777666666666666666677667766666776667776677766666666666666667766776666677666777667776666666666666666776677666667766677766777666
    6666666666666766667766677677667766666666666666666666676666776667767766776666666666666666666667666677666776776677666666666666666666666766667766677677667766666666
    66b666666666666666666667667776676666666666b666666666666666666667667776676666666666b666666666666666666667667776676666666666b6666666666666666666676677766766666666
    66b6666666666666666666666b6776666666666666b6666666666666666666666b6776666666666666b6666666666666666666666b6776666666666666b6666666666666666666666b67766666666666
    66b6666666666666666666666bb676666666666666b6666666666666666666666bb676666666666666b6666666666666666666666bb676666666666666b6666666666666666666666bb6766666666666
    66b66666669bb666666669966bbb66666666666666b66666669bb666666669966bbb66666666666666b66666669bb666666669966bbb66666666666666b66666669bb666666669966bbb666666666666
    66b66666699dbb666666dd9666bb66666666666666b666666999bb666666999666bb66666666666666b666666999bb666666999666bb66666666666666b666666999bb666666999666bb666666666666
    6bb6669669966bbb69666d9966bb6666666666666bb6669669966bbb69666d9966bb6666666666666bb6669669966bbb69666d9966bb6666666666666bb6669669966bbb69666d9966bb666666666666
    6bb666d96696d9bbb9966d9966bbb666666666666bb666d96696d9bbb9966d9966bbb666666666666bb666d96696d9bbb9966d9966bbb666666666666bb666d96696d9bbb9966d9966bbb66666666666
    6bb66dd9999d996bb99ddd96666bb666666666666bb66dd9999d996bb99ddd96666bb666666666666bb66dd9999d996bb99ddd96666bb666666666666bb66dd9999d996bb99ddd96666bb66666666666
    bbb666d9999d996bb99dd99669dbbb6696666666bbb666d9999d996bb99dd99669dbbb6696666666bbb666d9999d996bb99dd99669dbbb6696666666bbb666d9999d996bb99dd99669dbbb6696666666
    bbbdd6d9999d999bbb9dd999996bbb6699966666bbbdd6d9999d999bbb9dd999996bbb6699966666bbbdd6d9999d999bbb9dd999996bbb6699966666bbbdd6d9999d999bbb9dd999996bbb6699966666
    bbb6ddd9999d9999bb9dd9999d6bbb9699666666bbb6ddd9999d9999bb9dd9999d6bbb9699666666bbb6ddd9999d9999bb9dd9999d6bbb9699666666bbb6ddd9999d9999bb9dd9999d6bbb9699666666
    bbb6ddd999d99999bbbdd9999d9bbb9999669966bbb6ddd999d99999bbbdd9999d9bbb9999669966bbb6ddd999d99999bbbdd9999d9bbb9999669966bbb6ddd999d99999bbbdd9999d9bbb9999669966
    bbbdddd999d999999bbdd9999d9bbbb9999d9996bbbdddd999d999999bbdd9999d9bbbb9999d9996bbbdddd999d999999bbdd9999d9bbbb9999d9996bbbdddd999d999999bbdd9999d9bbbb9999d9996
    bb9dddd99dd9999999bb9999dd9bbbb9999d9999bb9dddd99dd9999999bb9999dd9bbbb9999d9999bb9dddd99dd9999999bb9999dd9bbbb9999d9999bb9dddd99dd9999999bb9999dd9bbbb9999d9999
    bb99ddddd999999999bbb999d999bbb9999d9999bb99ddddd999999999bbb999d999bbb9999d9999bb99ddddd999999999bbb999d999bbb9999d9999bb99ddddd999999999bbb999d999bbb9999d9999
    bb99dddd9999999999dbbbbdd999bbb9999d999bbb99dddd9999999999dbbbbdd999bbb9999d999bbb99dddd9999999999dbbbbdd999bbb9999d999bbb99dddd9999999999dbbbbdd999bbb9999d999b
    bb99ddd99999999999ddbbbb9999bbbb999d999bbb99ddd99999999999ddbbbb9999bbbb999d999bbb99ddd99999999999ddbbbb9999bbbb999d999bbb99ddd99999999999ddbbbb9999bbbb999d999b
    bb99ddd99999999999ddbbbbbb99bbbb999d999bbb99ddd99999999999ddbbbbbb99bbbb999d999bbb99ddd99999999999ddbbbbbb99bbbb999d999bbb99ddd99999999999ddbbbbbb99bbbb999d999b
    b9999dd9999999999ddddbbbbbbbbbbbb999d99bb9999dd9999999999ddddbbbbbbbbbbbb999d99bb9999dd9999999999ddddbbbbbbbbbbbb999d99bb9999dd9999999999ddddbbbbbbbbbbbb999d99b
    b9999ddd999999999dd99999bbbbbbbbb999d99bb9999ddd999999999dd99999bbbbbbbbb999d99bb9999ddd999999999dd99999bbbbbbbbb999d99bb9999ddd999999999dd99999bbbbbbbbb999d99b
    b9999dddd99999999dd999999bbbbbbbb999d9bbb9999dddd99999999dd999999bbbbbbbb999d9bbb9999dddd99999999dd999999bbbbbbbb999d9bbb9999dddd99999999dd999999bbbbbbbb999d9bb
    b9999ddddd999999ddd9999999bbbbbbb999dbbbb9999ddddd999999ddd9999999bbbbbbb999dbbbb9999ddddd999999ddd9999999bbbbbbb999dbbbb9999ddddd999999ddd9999999bbbbbbb999dbbb
    dd99999ddddd9999ddd999999999bbbbb999bbbbdd99999ddddd9999ddd999999999bbbbb999bbbbdd99999ddddd9999ddd999999999bbbbb999bbbbdd99999ddddd9999ddd999999999bbbbb999bbbb
    9d99999ddddddd9ddd9999999999bbbbb99bbbb99d99999ddddddd9ddd9999999999bbbbb99bbbb99d99999ddddddd9ddd9999999999bbbbb99bbbb99d99999ddddddd9ddd9999999999bbbbb99bbbb9
    9d999999dddddddddd9999999999bbbbb99bbb999d999999dddddddddd9999999999bbbbb99bbb999d999999dddddddddd9999999999bbbbb99bbb999d999999dddddddddd9999999999bbbbb99bbb99
    9d999999ddddddddd99999999999bbbbb99bb9999d999999ddddddddd99999999999bbbbb99bb9999d999999ddddddddd99999999999bbbbb99bb9999d999999ddddddddd99999999999bbbbb99bb999
    9dd99999ddddddd9999999999999bbbbb99bbd999dd99999ddddddd9999999999999bbbbb99bbd999dd99999ddddddd9999999999999bbbbb99bbd999dd99999ddddddd9999999999999bbbbb99bbd99
    99dd9999dddddd99999999999999bbbbb99bbd9999dd9999dddddd99999999999999bbbbb99bbd9999dd9999dddddd99999999999999bbbbb99bbd9999dd9999dddddd99999999999999bbbbb99bbd99
    99ddd999dddddd99999999999999bbbbb9bbbdd999ddd999dddddd99999999999999bbbbb9bbbdd999ddd999dddddd99999999999999bbbbb9bbbdd999ddd999dddddd99999999999999bbbbb9bbbdd9
    9999dddddddddd9999999999999bbbbbb9bbb9d99999dddddddddd9999999999999bbbbbb9bbb9d99999dddddddddd9999999999999bbbbbb9bbb9d99999dddddddddd9999999999999bbbbbb9bbb9d9
    9999dddddddddd9999999999999bbbbbbbbb99d99999dddddddddd9999999999999bbbbbbbbb99d99999dddddddddd9999999999999bbbbbbbbb99d99999dddddddddd9999999999999bbbbbbbbb99d9
    999999dddddddd9999999999999bbbbbbbbb99dd999999dddddddd9999999999999bbbbbbbbb99dd999999dddddddd9999999999999bbbbbbbbb99dd999999dddddddd9999999999999bbbbbbbbb99dd
    d9999999dddddd999999999999bbbbbbbbb9999dd9999999dddddd999999999999bbbbbbbbb9999dd9999999dddddd999999999999bbbbbbbbb9999dd9999999dddddd999999999999bbbbbbbbb9999d
    dd9999999ddddd999999999999bbbbbbbbb99999dd9999999ddddd999999999999bbbbbbbbb99999dd9999999ddddd999999999999bbbbbbbbb99999dd9999999ddddd999999999999bbbbbbbbb99999
    dd9999999ddddd999999999999bbbbbbbb999999dd9999999ddddd999999999999bbbbbbbb999999dd9999999ddddd999999999999bbbbbbbb999999dd9999999ddddd999999999999bbbbbbbb999999
    9d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb999999
    9d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb999999
    9d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb999999
    9d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb9999999d9999999ddddd99999999999bbbbbbbbb999999
    9dd999999ddddd99999999999bbbbbbbb99999999dd999999ddddd99999999999bbbbbbbb99999999dd999999ddddd99999999999bbbbbbbb99999999dd999999ddddd99999999999bbbbbbbb9999999
    9dd999999ddddd99999999999bbbbbbbb99999999dd999999ddddd99999999999bbbbbbbb99999999dd999999ddddd99999999999bbbbbbbb99999999dd999999ddddd99999999999bbbbbbbb9999999
    ddd999999ddddd99999999999bbbbbbbb9999999ddd999999ddddd99999999999bbbbbbbb9999999ddd999999ddddd99999999999bbbbbbbb9999999ddd999999ddddd99999999999bbbbbbbb9999999
    dd9999999ddddd99999999999bbbbbbbb9999999dd9999999ddddd99999999999bbbbbbbb9999999dd9999999ddddd99999999999bbbbbbbb9999999dd9999999ddddd99999999999bbbbbbbb9999999
    dd9999999dddddd9999999999bbbbbbbb9999999dd9999999dddddd9999999999bbbbbbbb9999999dd9999999dddddd9999999999bbbbbbbb9999999dd9999999dddddd9999999999bbbbbbbb9999999
    dd9999999dddddd9999999999bbbbbbbb9999999dd9999999dddddd9999999999bbbbbbbb9999999dd9999999dddddd9999999999bbbbbbbb9999999dd9999999dddddd9999999999bbbbbbbb9999999
    dd9999999dddddd9999999999bbbbbbb99999999dd9999999dddddd9999999999bbbbbbb99999999dd9999999dddddd9999999999bbbbbbb99999999dd9999999dddddd9999999999bbbbbbb99999999
    d99999999dddddd9999999999bbbbbbb9999999dd99999999dddddd9999999999bbbbbbb9999999dd99999999dddddd9999999999bbbbbbb9999999dd99999999dddddd9999999999bbbbbbb9999999d
    d99999999dddddd9999999999bbbbbbb999999ddd99999999dddddd9999999999bbbbbbb999999ddd99999999dddddd9999999999bbbbbbb999999ddd99999999dddddd9999999999bbbbbbb999999dd
    d99999999dddddd9999999999bbbbbbb999999ddd99999999dddddd9999999999bbbbbbb999999ddd99999999dddddd9999999999bbbbbbb999999ddd99999999dddddd9999999999bbbbbbb999999dd
    999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd
    999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd
    999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd999999999ddddddd999999999bbbbbbb99999ddd
    999999999dddddddd99999999bbbbbbb9999dddd999999999dddddddd99999999bbbbbbb9999dddd999999999dddddddd99999999bbbbbbb9999dddd999999999dddddddd99999999bbbbbbb9999dddd
    999999999dddddddd99999999bbbbbbb9999dddd999999999dddddddd99999999bbbbbbb9999dddd999999999dddddddd99999999bbbbbbb9999dddd999999999dddddddd99999999bbbbbbb9999dddd
    999999999dddddddd99999999bbbbbbb9999ddd9999999999dddddddd99999999bbbbbbb9999ddd9999999999dddddddd99999999bbbbbbb9999ddd9999999999dddddddd99999999bbbbbbb9999ddd9
    9999999999dddddddd999999bbbbbbbb9999ddd99999999999dddddddd999999bbbbbbbb9999ddd99999999999dddddddd999999bbbbbbbb9999ddd99999999999dddddddd999999bbbbbbbb9999ddd9
    d999999999dddddddd999999bbbbbbbbddddddddd999999999dddddddd999999bbbbbbbbddddddddd999999999dddddddd999999bbbbbbbbddddddddd999999999dddddddd999999bbbbbbbbdddddddd
    ddddd99999dddddddd999999bbbbbbbbbdddddddddddd99999dddddddd999999bbbbbbbbbdddddddddddd99999dddddddd999999bbbbbbbbbdddddddddddd99999dddddddd999999bbbbbbbbbddddddd
    dddddddd99ddddddddd999ddbbbbbbbbbddddddddddddddd99ddddddddd999ddbbbbbbbbbddddddddddddddd99ddddddddd999ddbbbbbbbbbddddddddddddddd99ddddddddd999ddbbbbbbbbbddddddd
    ddddddddddddddddddd9ddddbbbbbbbbbdddddddddddddddddddddddddd9ddddbbbbbbbbbdddddddddddddddddddddddddd9ddddbbbbbbbbbdddddddddddddddddddddddddd9ddddbbbbbbbbbddddddd
    ddddddddddddddddddddddddbbbbbbbbbbddddddddddddddddddddddddddddddbbbbbbbbbbddddddddddddddddddddddddddddddbbbbbbbbbbddddddddddddddddddddddddddddddbbbbbbbbbbdddddd
    ddddddddddddddddddddddddbbbbbbbbbbddddddddddddddddddddddddddddddbbbbbbbbbbddddddddddddddddddddddddddddddbbbbbbbbbbddddddddddddddddddddddddddddddbbbbbbbbbbdddddd
    dddddddddddddddddddddddbbbbbbbbbbbdddddddddddddddddddddddddddddbbbbbbbbbbbdddddddddddddddddddddddddddddbbbbbbbbbbbdddddddddddddddddddddddddddddbbbbbbbbbbbdddddd
    dddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddd
    dddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddd
    dddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddd
    dddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddddddddddddddddddddddddddbbbbbbbbbbbbddddd
    ddddddddddddddddddd7777777777bbbbbbdddddddddddddddddddddddd7777777777bbbbbbdddddddddddddddddddddddd7777777777bbbbbbdddddddddddddddddddddddd7777777777bbbbbbddddd
    dddddddddddddd77777777777777777777bddddddddddddddddddd77777777777777777777bddddddddddddddddddd77777777777777777777bddddddddddddddddddd77777777777777777777bddddd
    ddddddddddd7777777777777777777777777ddddddddddddddd7777777777777777777777777ddddddddddddddd7777777777777777777777777ddddddddddddddd7777777777777777777777777dddd
    dddddddd777777777777777777777777777777dddddddddd777777777777777777777777777777dddddddddd777777777777777777777777777777dddddddddd777777777777777777777777777777dd
    ddddd77777777777777777777777777777777777ddddd77777777777777777777777777777777777ddddd77777777777777777777777777777777777ddddd77777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    `)
game.showLongText("Welcome to the game Monkey Jumper. ", DialogLayout.Full)
game.showLongText("In the game you are a monkey who collects bananas. Bananas are your weapons, press \"B\" to throw a banana once you have collected it. Special orbs called Power ups might give you more bananas or make you jump higher. Lastly press \"A\" to jump.", DialogLayout.Full)
tiles.setCurrentTilemap(tilemap`level2`)
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
Place_Power_Ups()
Make_Banana()
Make_Mushrooms()
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
