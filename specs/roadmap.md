# Roadmap

### Sprint #1 (MVP)
#### Features
- Timer: displays the minutes and seconds and counts down to 00:00
  - should be front and center and the most prominent element in the screen
- Buttons: user-controlled interactions
  - Start: will start the count-down of the timer (the timer must wait for this command)
  - Restart: will reset the timer (e.g. if timer was at 22:59, it will go back to 25:00)
    - if the timer hits 00:00 then that counts as a successful Pomodoro, a reset will restart *that* Pomodoro
      - e.g. if I was on Pomo #2 and was interupted and re-started the clock, I'm still in #2
  - buttons will be below the timer and easy to access
  - there should be visible feedback for the hover + click
