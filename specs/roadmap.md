# Roadmap

### Sprint #1 (MVP)
#### Features
- **Timer**: displays the minutes and seconds and counts down to 00:00
  - should be front and center and the most prominent element in the screen
- **Buttons**: user-controlled interactions
  - **Start**: will start the count-down of the timer (the timer must wait for this command)
  - **Restart**: will reset the timer (e.g. if timer was at 22:59, it will go back to 25:00)
    - if the timer hits 00:00 then that counts as a successful Pomodoro, a reset will restart *that* Pomodoro
      - e.g. if I was on Pomo #2 and was interupted and re-started the clock, I'm still in #2
  - **Finish**: ends the session; in future sprints, this will show a record of the session's Pomodoro's (but for this sprint, it might not do anything)
    - by session I mean the day of work
    - may change the word label of this
  - buttons will be below the timer and easy to access
  - there should be visible feedback for the hover + click
- **Color**: ideally have a different background color for each mode (Pomodoro, Short Break, Long Break)
  - all colors should be blues/greens/calm colors that are not distracting (e.g. not red lol)
- **Settings**:
- **Label**: above the timer, we should have a written label for the mode we are in rather than *just* relying on background color
  - e.g. in Pomodoro, the label has "Pomodoro"
- **Info/About page**: page will hover over the current window with information on the Pomodoro techniue and specific features
  - need to decide on what signifier we will use to allow the user to find this page (e.g. 'About', '?' icon, button, etc.)
  - we can decide if the user can also modify specific features while in this info page
    - example: "Did you know you can set audio notification" could have a button for that that doesn't just mirror the actual features in settings but also will change audio 
    
    
#### Internal Features
- **Counter**: we need some way of tracking both the total number of Pomodoros/short breaks/long breaks completed tht day for the record BUT also we need to count 4 Pomodoros towards a **set** that will then transition the timer into "long break"
- **Central Control**: we need a way to switch the timer into the different modes: Pomodoro, Short Break, & Long Break
