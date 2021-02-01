# First Sprint - Getting Started (Week 5)
##### Team: Powell's Owls | Group 33

### Overview
| Date       | Time      | Type of Meeting   | Where   |
| ---------- | --------- | ----------------- | ------- |
| 02/01/2021 | 11am-1pm  | Logistics, Planning & Design | Zoom    |

---

### Meeting

#### Agile
- **Issues** will be recorded in the [Issues](https://github.com/ntrappe/cse110-w21-group33/issues) tab of this repo
  - we will create specific labels to address the topic of the issue
  - issues will be "assigned" to the pair working on them
  - the group unanimously voted to use Github's internal Issues vs a 3rd party API
  - *note: we may want to create a specific template for these initial features*
- **Glossery**  will contain definitions of all the terms we'll be throwing around
  - it will have notes on specific verbage used in CSE 110 (e.g. ADR, server-side, MVP)
  - it should also include naming conventions of different UI elements (e.g. lightbox)
  - *note: Lulu is setting this up*
- **Coding Guidelines** will set a standard for how we will write code and make it easier for others to read/collaborate
  - currently, we are considering using [Google's guide](https://google.github.io/styleguide/htmlcssguide.html) on HTML/CSS/Javascript
  - *note: Richard is deciding whether Google's guide is good enough (or an alt) and will add a small summary of key points*
- **Tools/Languages:**
  - we will be using HTML/CSS/Javascript
  - as of right now, we will not be using another other packages/languages
  - browser usage: 
    - Felix, Lulu, Bryant, Brandon, Vy, & Richard use `Chrome`
    - Nicole uses `Safari` and primarily `Firefox`
    - *note: this will be helpful when we test the website on different browsers*
  - tool version:
    - most common version of node is `14.15.4` 
    - other versions were `12.18.3` and `15.7.0`
  - operating systems:
    - Felix & Richard use `Windows`
    - Brandon, Bryant, Vy, Lulu, Nicole, & Richard use `Mac`
  - **TODO**: determine which browser & node versions we will support
  
#### Pipeline
- **Pair Programming**:
  - We had a unanimous decision to split the group into pairs with one experienced person and one novice
    - *note: Vy is assigning pairs using the [survey data](https://docs.google.com/spreadsheets/d/1g_giNNFPhfYURECuiL-7z6LZk3ndYcQhSNKUR0K9wno/edit?usp=sharing) from Week 1*
    - each pair should schedule meetings to jointly code or discuss their work
    - each pair should log any issues in the [Issues](https://github.com/ntrappe/cse110-w21-group33/issues) tab and assign that issue to themselves
    - each pair will be assigned one feature at a time
    - each pair should rely on their partner to answer questions before reaching out to the group
    - each pair is responsible for **setting their own deadline**, completing their work, and raising concerns to either Nicole, Chad, or Powell
  - During the `Thursday @6pm` meetings, we will have a check-in wherein each pair will report the status of their work
    - if advice/user input/technical help is needed, this is the place to raise those concerns
  - **Setting deadlines:**
    - the pair will use the Agile [story point/t-shirt](https://www.atlassian.com/agile/project-management/estimation) system (`1-XSmall`, `2-Small`, `4-Medium`, `8-Large`, `16-XLarge`)
    - assigning points is relative to each pair's experience and feature
      - *note: each sprint will have a general deadline but it is up to each pair to evaluate the amount of work/feature*
      - example: One pair has been designing buttons for years, so, the task of designing a button might be 'XSmall' or 'Small'
- **Work Status:**
  - each pair will keep a doc on the progress of their work
  - this doc should contain links to the current issues, potential fixes, the feature status, and any notes/brainstorming
    - this is a way for the team to keep all their ideas in one central place
  - *note: Brandon is finding examples/outlines of this doc*
- **Code Review/Testing:**
  - pair #1 will write the code for a feature
  - pair #2 (different pair) will review the work of pair #1 via a pull request on their own branch
    - if there are any bugs, they will push changes to their working branch
  - pair #3 will check if there are merge conflicts or bugs in pair #2's code
    - if no bugs, they will push pair #2's changes to the **main** branch
  - this way, all the pairs rotate who reviews and verifies work
    - there will be NO one person as the code reviewer
  - *note: we need to ask Chad if this is a good system & what to do about merge conflicts + documenting those (add to Issues?)*
---

### Agenda
#### Agile
- set up backlog/issues
- set coding guidelines
- discuss the glossery
- determine which tools and languages we will use
  - what browsers to support
  - do we really need this/that library?
- review features with the *Five Whys*
   1. who does this benefit?
   2. what is the context?
   3. when would the answer work?
   4. where would the answer work?
   5. why is this a problem?
  
#### Design
- think about accessibility
  - do we want to include different languages
  - do we want to use mouse and key presses
    - does anything require more than just 1 finger?
  - how about for people that need hearing aids
  - colorblind people/need high contrast
  - older people need larger fonts
- wireframing
  - what is the flow of our site going to look like
  - how can the user interact
  - mock up story board
  
#### Pipeline
- split up work, potentially do as pair-programming
- set deadlines
- how are we keeping track of the status of work and who is doing what
- code review
- advanced testing

---
  

### Attendance
- [ ] Michael Donaldson
- [x] Richard Duong
- [x] Brandon Liu
- [x] Bryant Shao
- [ ] Steven Steiner
- [x] Nicole Trappe
- [x] Vy Truong
- [x] Felix Zhang
- [x] Lulu Zhu
