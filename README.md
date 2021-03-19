<img src="/group33_header.png" alt="owl" width="800"/>

### Table of Contents
1. [Meeting Notes](#meeting-notes) <br/>
2. [Group Contract](#group-contract) <br/>
3. [Project Overview](#project-overview) <br/>
4. [Coding Standards](#coding-standards) <br/>
5. [GitHub Standards](#github-standards) <br/>
6. [Code Documentation](#code-documentation) <br/>
7. [Navigation](#navigation) <br/>
8. [Onboarding](#onboarding) <br/>
9. [Resources](#resources) 

---

#### Meetings
- Group Meeting #1: `Monday, 11am`
  - Note: ideal meeting for long sessions like brainstorming, coding because availability is from 11am-2pm.
- Group Meeting #2: `Thursday, 6pm`
- Chad Meeting: `Friday, 5pm`
- Default Meeting: `ID: 411 780 2958` or https://ucsd.zoom.us/j/4117802958
- Otherwise, meeting link will be posted in Slack [Meetings channel](https://app.slack.com/client/T01JS26BQ2D/C01LBTQJMFT/details/)

---

#### Meeting Notes
- All meeting notes can be found in the Wiki
- They should be in ***Markdown*** format and labeled as *mm-dd-yy-topic*.md (e.g. 01-19-21-kickoff.md).
- They should include: type of meeting, attendance, time/place, items for future investigation, decision etc.
- For a sample of the meeting notes, click [here](https://github.com/ntrappe/cse110-w21-group33/wiki/01-18-21-sample).
- We will assign a note taker on a rotating basis so that everyone has a chance to enjoy this responsibility.

| Week | Group Meet 1 Date | Note Taker | Group Meet 2 Date* | Note Taker* | Chad Meet Date | Note Taker | 
| ---- | ----------------- | ---------- | ------------------ | ----------- | -------------- | ---------- |      
| 2    | 01/14/2021        | N/A        | N/A                | N/A         | 01/15/2021     | N/A        |
| 3    | 01/19/2021        | Nicole     | N/A                | N/A         | 01/22/2021     | Steven     |
| 4    | 01/26/2021        | Brandon    | 01/28/2021         | Michael     | 01/29/2021     | Felix      |
| 5    | 02/01/2021        | Nicole     | 02/04/2021         | Lulu        | 02/05/2021     | Bryant     |

`* = if applicable (sometimes we may have only 1 or 2 group meetings / week)`

---

#### Group Contract
- All group contracts can be found in the Wiki.
- *The* contract should be in ***Markdown*** format.
- It should include: (a) definition of what is expected to be on the team AND (b) definition of how to address situations where group "rules" are not being followed.
- Each member will sign the contract, reupload it as a ***PDF***, and label it as *rules-firstlast.md* (e.g. rules-thomaspowell.pdf).
- For a sample group contract, click [here](https://ohiostate.pressbooks.pub/feptechcomm/chapter/7-project-communications/).

---

#### GitHub Standards
- To get started on the command line: 
```python
// clone the repo
git clone https://github.com/ntrappe/cse110-w21-group33.git
// set up your own branch
git branch my_name_branch
// then switch to that branch
git checkout my_name_branch
// to confirm that you switched branches
git branch -v
// when you've created files or made changes
git add .
git commit -m "I updated ___"
// push to your branch
git push origin my_name_branch
```
- To squash commits:
```vim
git rebase -i [HEAD or starting commit]~[number of commits from that point]
// example: git rebase -i HEAD~6
// "pick" the top commit then "squash" the others
git push --force-with-lease
```

- To get all the current branches
```vim
git fetch
// check what branches you have
git branch -av
```

- For information on using events and testing, read the Wiki's Guides section

---

#### Navigation
- Documentation about Timer structure can be found in the wiki under Timer Architecture.
- The main control center code is in index.html, index.css, control.js, resize.js, and storage.js and can be found in source/
- Specific components and their JS and CSS can be found in source/components
- Images and Audio for the Timer can be found in source/assets/images and source/assets/audio
- Cypress and Jest testing can be found in testing/cypress and testing/jest

---

### Onboarding
- New members can check out our onboarding document [here](https://github.com/ntrappe/cse110-w21-group33/wiki/Onboarding) to get an understanding of the pipeline and basic git commands
- The Wiki contains various ADR's relating to design decisions 

---

#### Resources
1. Prototyping: https://marvelapp.com/pop
2. https://basecamp.com/shapeup
3. [Color blind design](https://davidmathlogic.com/colorblind/#%23D81B60-%231E88E5-%23FFC107-%23004D40)
4. [Google HTML/CSS Styling](https://google.github.io/styleguide/htmlcssguide.html)
