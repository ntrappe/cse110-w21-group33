# Setup/First Sprint Part 2
##### Team: Powell's Owls | Group 33

### Overview
| Date       | Time      | Type of Meeting   | Where   |
| ---------- | --------- | ----------------- | ------- |
| 02/04/2021 | 6-7:30pm PST | Present work, Planning         | Zoom    |


### Prep
If you're very confused about what's currently happening, review the [meeting notes](https://github.com/ntrappe/cse110-w21-group33/blob/main/admin/meetings/02-01-21-first-sprint.md) from Monday. Since we'll be pairing up, these initial tasks have been assigned to temporary pairs. After this session, we will evaluate whether these pairs work well.
- CSS reset: site forces own styles to ensure that all 3 browsers display things the same way
 
---

**1. User Centered Thinking Documents.** <br/>
You need to formally document your project's target audience, including [personas](http://opendesignkit.org/methods/personas/), 
[user stories](https://en.wikipedia.org/wiki/User_story), and optionally [use cases](https://en.wikipedia.org/wiki/Use_case)
(which document a broader set of activities the user has with the system, focused more on the task than the user's needs).

**✅ Team Members**: Bryant & Brandon

- Created folder called target_users in specs with 4 personas and user stories
  - Personas cover people from all walks of life and tech familiarity 

---
  
**2. ADRs.**  <br/>
As your team makes decisions, you should be filling out [ADRs](https://adr.github.io/madr/) documenting your decisions and reasons. What features are you going to include/exclude? Who is your target audience? What are the major elements of your UI design? How do you break your architecture up into components/pages? All these decisions and more should be documented in ADRs. We'll be asking for retrospectives later in the term, and well-made ADRs make it much easier to reflect on your expectations/reasoning and compare it with the outcome.

#### Notes:
- Many of the features we mentioned adding or not adding are in the Meeting Notes from Week 4
- It may be good to mention the essential features then ones we want for later sprints (and classify them that way)
- Explain why we chose what we did and how it meets specific *user needs*

**✅ Team Members**: Vy & Michael

- Did lots of brainstorming, less decisions
- Currently have 3 ADRs
- Still discussing the UI Decisions ADR
  - Discussing pair programming as well
- Mentions we do not have many considered options as group is mostly on same page
- Might want to add obvious things (why the timer is front center, why timer instead of analog, etc)
- Having everything in github might be unneccessary, we will bring it up with Chad
  - For example, there are a huge amount of commits and it makes it harder to track what's happening

---

**3. Interface Designs.** <br/>
Start sketching out your app's UI! It's good to incrementally design these in increasing levels of detail. Start with a [fat marker sketch](https://basecamp.com/shapeup/1.3-chapter-04) to get a general idea. Move on to [wireframes](https://www.experienceux.co.uk/faqs/what-is-wireframing/) once you've begun converging on a design. Finally, once you're confident, move on to a detailed mock-up that lays out exactly how each page should look. Don't just jump to the latter stages--you might spend a lot of time designing something that doesn't work!

#### Notes:
- Nicole did wireframes during Monday's meeting

**✅ Team Members**: (Nicole) + Richard & Lulu

- Presented mockups, current color choices
- Nicole brought up having a cool tone for the work design
- Decided against top bar, choosing between side bar and lightbox
  - Can choose set width for side bar to prevent running out of space
- Sliding side bar
- Test animations after functional demo, easy to adjust
  - Idea: have background signify progress by having it fade into the next session's color
  - Idea: only have it distracting during break
  - Perhaps for calm mode
  - Possible cons: might be distracting
- TODO: Make in figma, create the animation
- Change restart to reset 
- Have Finish be below the other buttons to make it clear it's not to be used often
  - Have only one Start option below the timer

---

**4. System Diagrams** <br/>
You need to formally document your application's architecture. These can take multiple forms, including [C4](https://c4model.com/), [event modeling](https://eventmodeling.org/posts/what-is-event-modeling/), and [UML diagrams](https://en.wikipedia.org/wiki/Unified_Modeling_Language#Diagrams). This isn't an either/or choice. Since each of these focus on different (albeit sometimes overlapping) parts of the system, you should have a mixture of these to describe your whole system. I'd recommend starting with C4 and going from there, but the choice is up to you.

#### Notes:
- there's an inital version in [/specs](https://github.com/ntrappe/cse110-w21-group33/blob/main/specs/brainstorm-prep-spec.md)

**✅ Team Members**: (maybe Nicole) + Felix & Steven

- Miro board: 4C Diagrams
- Timer, Storage, Setting, Help component

---

**5. Project Pitch.** Condense your brainstorming and design documents above into a single project pitch that you'll deliver for me. Treat it like you're pitching your project for upper management/an outside company, meaning you need to describe every aspect of your system like I'm an outsider: the problem, audience, architecture, UI design, features, roadmap, etc. To see how you should structure your pitch, see [chapter 6 from Shape Up](https://basecamp.com/shapeup/1.5-chapter-06). You can reuse your existing diagrams, but the pitch itself should be a separate document with the diagrams copied inside.

#### Notes
- Be prepared to present to Chad on `Friday, 02/05 @5pm`
- You should at least have a rough draft of your system's features, UI, and architecture

**✅ Team Members**: Whole Team (will be done in this meeting)

- Ideas: give background story to explain our problem
- Rabbit holes: not overdeveloping, not having UI clutter, not distracting

---

**6. Project Roadmap.** <br/>
Divide features into sprints. As discussed in class, there are four total sprints. How will you divide work between the sprints? What is your MVP for sprint 2, and what are your stretch goals for sprint 3? Will you leave flex time for cleanup/refactoring/debugging/finishing features?

**:pencil: Team Members**: Nicole & whole team will decide on agreement/disagreement

---

**7. Glossery.** <br/>

**✅ Assigned To**: Lulu

---

**8. HTML/CSS/JS Guidelines** <br/>
Acronyms are often useful and efficient, but have an on boarding cost. Try to speak a common dialect other than a project specific one

**✅ Assigned To**: Richard

---

**9. Pair Work Documentation** <br/>
Def TBD

**✅ Assigned To**: Bryant

---

**10. Assigning Pairs** <br/>
Def TBD

**✅ Assigned To**: Vy

---


ALSO go to **Projects** > **Pomodoro Timer** > **Setup Sprint (To Do)** and add your name to the specific note with the task that matches the one you chose above.

![project_todo](images/project_cards.png)

---

### Attendance
- [x] Michael Donaldson
- [x] Richard Duong
- [x] Brandon Liu
- [x] Bryant Shao
- [x] Steven Steiner
- [x] Nicole Trappe
- [x] Vy Truong
- [x] Felix Zhang
- [x] Lulu Zhu