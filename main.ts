enum RadioMessage {
    message1 = 49434,
    Alarm1 = 42306,
    Alarm2 = 41318,
    Alarmstate0 = 7740,
    Pairverify = 63623,
    Alarmscharf = 54702,
    Alarmoffreset = 15307,
    AlarmscharfR = 44234,
    ALARMALARM = 20045
}
/**
 * Deactivate alarm with RFID chip
 * 
 * (Chip has to be registerd)
 */
radio.onReceivedMessage(RadioMessage.Alarmoffreset, function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(1000)
    basic.clearScreen()
    control.reset()
})
/**
 * Alarm On
 */
radio.onReceivedMessage(RadioMessage.AlarmscharfR, function () {
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
radio.onReceivedMessage(RadioMessage.ALARMALARM, function () {
    for (let index = 0; index < 10; index++) {
        music.playMelody("C5 - C5 - C5 - C5 - ", 120)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    radio.sendMessage(RadioMessage.Alarmscharf)
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
    radio.sendMessage(RadioMessage.AlarmscharfR)
    basic.pause(5000)
    music.playMelody("C5 - C5 - - - - - ", 322)
    Alarmscharf = 1
})
/**
 * Power On
 */
let Alarmscharf = 0
led.setBrightness(255)
Alarmscharf = 0
radio.setGroup(1)
radio.setFrequencyBand(83)
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
            for (let index = 0; index < 10; index++) {
                radio.sendMessage(RadioMessage.ALARMALARM)
                music.playMelody("C5 - C5 - C5 - C5 - ", 120)
            }
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
