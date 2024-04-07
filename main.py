# Spezial-Kabel ganz nach links auf der Steckleiste vom Calliope bzw. am RFID Reader mit BLAU = 3.3V verbinden.
MFRC522.init(DigitalPin.C9, DigitalPin.C8, DigitalPin.C7, DigitalPin.P0)

def on_forever():
    if MFRC522.test_id() != 0:
        basic.show_number(MFRC522.get_id())
    else:
        basic.clear_screen()
basic.forever(on_forever)
