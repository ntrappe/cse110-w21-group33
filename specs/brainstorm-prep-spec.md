# 🌩 Brainstorm 🌩 Prep Spec

#### PROBLEM  
What problem are we trying to solve?

---

#### PURPOSE
What would someone want to use our app instead of a timer or todo-list?

---

#### PEOPLE
Who is our user? What do they want? What does their day look like? What constraints do they have (e.g. money, time)?

---

#### FLOW
![Traditional Pomodoro](/specs/Pomo_traditional_flow.png) <br/>


---

#### COMPONENTS
1. Visibility <br/>
**Version A:** Widget/Window <br/>
**Version B:** Tab <br/>
2. Automation
**Version A:** Auto Transitions <br/>
**Version B:** Manual Transitions <br/>
3. Discoverability
4. Transition Feedback <br/>
**Version A:** Audio <br/>
**Version B:** Notification <br/>
5. Customization
**Version A:** Traditional Pomodoro <br/>
**Version B:** Partial Customization <br/>
**Version C:** Full Customization <br/>
6. Inputs
7. Outputs

BONUS:
8. Dynamic
9. Content

---

#### CONCERNS
- todolist might detract from time management
- should customization involve self-exploration or be prompted?
- gamification
- how to notify people of transition
  - audio can be annoying so have first-timers set it?
  - if a small window/widget should there be options to see timer vs progress bar (some ppl like explicit time, others find it distracting)
  - timer gets lost in tabs
- since sets are determined by Pomodoros, do we care how many breaks people miss? Should that be taken into account for the longer break?
- automation is a tough design issue
  - if auto: then we need to set a stop condition otherwise could keep running (e.g. Spotify runs all day, Netflix "are you still watching?"); assumes you will take the break
  - if manual: can be annoying/break flow, but it confirms you want to start working/take a break
- when starting session, should ask if want classic Pomo or to customize? Or let them explore customization in setting?

---

#### YML
![Version 1](/specs/flow_v1.png)

