enum RadioMessage {
    message1 = 49434,
    Alarm1 = 42306,
    Alarm2 = 41318,
    Alarmstate0 = 7740
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    radio.sendMessage(RadioMessage.Alarm1)
})
radio.onReceivedMessage(RadioMessage.Alarm2, function () {
    basic.setLedColor(0xff0000)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    music.playMelody("C5 - C5 - - - - - ", 120)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    radio.sendMessage(RadioMessage.Alarmstate0)
    basic.showIcon(IconNames.Heart)
    control.reset()
})
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Cow)
    MFRC522.write("420")
    if (MFRC522.testID() == 420) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        control.reset()
    }
})
radio.onReceivedMessage(RadioMessage.Alarm1, function () {
    basic.setLedColors(0xff0000, 0x00ff00, 0x00ff00)
    basic.showLeds(`
        # # . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(1000)
    basic.setLedColors(0xff0000, 0xff0000, 0x00ff00)
    basic.showLeds(`
        # # # # .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(1000)
    basic.setLedColors(0xff0000, 0xff0000, 0xff0000)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    radio.sendMessage(RadioMessage.Alarm2)
    basic.pause(1000)
    music.playMelody("C5 - C5 - - - - - ", 322)
})
radio.onReceivedMessage(RadioMessage.Alarmstate0, function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(1000)
    basic.clearScreen()
    control.reset()
})
radio.setGroup(1)
radio.setTransmitPower(7)
MFRC522.Init(
DigitalPin.C9,
DigitalPin.C8,
DigitalPin.C7,
DigitalPin.P0
)
basic.pause(1000)
basic.setLedColor(0x00ff00)
basic.showLeds(`
    # # # # #
    . . . . .
    . . . . .
    . . . . .
    . . # . .
    `)
basic.forever(function () {
    if (MFRC522.getID() == 420) {
        radio.sendMessage(RadioMessage.Alarmstate0)
    }
    if (MFRC522.getID() < 419) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        music.ringTone(131)
        basic.pause(1000)
        basic.clearScreen()
        music.stopAllSounds()
    }
    if (MFRC522.getID() > 421) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        music.ringTone(131)
        basic.pause(1000)
        basic.clearScreen()
        music.stopAllSounds()
    }
})
