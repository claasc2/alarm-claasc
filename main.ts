enum RadioMessage {
    message1 = 49434,
    Alarm1 = 42306,
    Alarm2 = 41318,
    Alarmstate0 = 7740,
    Pairverify = 63623,
    Alarmscharf = 54702,
    Alarmoffreset = 15307
}
/**
 * Power On
 */
radio.onReceivedMessage(RadioMessage.Alarmoffreset, function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(1000)
    basic.clearScreen()
    control.reset()
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    radio.sendMessage(RadioMessage.Alarm1)
})
/**
 * Alarm On
 */
/**
 * Deactivate alarm with RFID chip
 * 
 * (Chip has to be registerd)
 */
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
    Alarmscharf = 1
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    radio.sendMessage(RadioMessage.Alarmscharf)
})
/**
 * How to Register Chip
 */
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Cow)
    if (MFRC522.testID() != 420) {
        MFRC522.write("420")
        basic.showIcon(IconNames.Yes)
        basic.pause(2000)
        control.reset()
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
/**
 * Alarm getting rdy
 */
radio.onReceivedMessage(RadioMessage.Alarmscharf, function () {
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
    basic.pause(5000)
    music.playMelody("C5 - C5 - - - - - ", 322)
    Alarmscharf = 1
})
let Alarmscharf = 0
Alarmscharf = 0
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
loops.everyInterval(500, function () {
    if (Alarmscharf == 1) {
        if (input.soundLevel() > 70) {
            music.playMelody("C5 - C5 - C5 - C5 - ", 120)
        }
    }
})
basic.forever(function () {
    if (MFRC522.getID() == 14197263231) {
        radio.sendMessage(RadioMessage.Alarmoffreset)
        basic.showIcon(IconNames.Heart)
        basic.pause(2000)
        control.reset()
    }
    if (MFRC522.getID() != 14197263231) {
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
