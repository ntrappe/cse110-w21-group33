class PomoFinish extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        
        // the component wrapper
        const wrapper = document.createElement('div');

        // button to finish session and display statistics
        const finishButton = document.createElement('button');
        finishButton.setAttribute('id', 'finishButton');
        finishButton.textContent = "Finish";
        finishButton.onclick = () => {
          // display the statistics
          modal.style.display = "block";
        }

        // the lightbox
        const modal = document.createElement('div');
        modal.setAttribute('id', 'modal');
        modal.onclick = (event) => {
          // close lightbox when click outside of the content area
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }

        // wrapper for the content inside the lightbox
        const modalContent = document.createElement('div');
        modalContent.setAttribute('id', 'modalContent');

        // the main content to be display in the lightbox
        // title
        const modalTitle = document.createElement('div');
        modalTitle.setAttribute('class', 'modalTitle');
        modalTitle.innerHTML = "SESSION SUMMARY";
        // list of stat
        this.sessionStatistics = document.createElement('ul');
        this.sessionStatistics.setAttribute('id', 'statistics-panel');

        // button to close the lightbox
        const closeButton = document.createElement('div');
        closeButton.setAttribute('id', 'closeButton');
        closeButton.innerHTML = "&times;";
        closeButton.onclick = () => {
          modal.style.display = "none";
        }

        // append elements to containers
        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(this.sessionStatistics);
        modal.appendChild(modalContent);
        wrapper.appendChild(modal);
        wrapper.append(finishButton);

        // element containing the styling
        let style = document.createElement('style');
        style.textContent = `
          #modal {
            display: none;
            position: fixed;
            z-index: 1; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto;  
            background-color: rgba(0,0,0,0.5);
          }
        
          #modalContent {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 15px;
            border: 1px solid #888;
            height: 50%;
            width: 50%;
          }
        
          #closeButton {
            background-color: red;
            color: black;
            float: right;
            font-size: 30px;
            padding: 2px ;
            border: 2px solid #888;
            border-radius: 2px;
            display: block;
          }
        
          #statistics-panel {
            display: block;
            color: black;
            background-color: yellow;
            width: 100%; 
            height: 100%;
            margin: 0px 0px 0px;
          }
          
          li {
            display: block;
            color: black;
            background-color: blue;
          }
        `
        
        shadow.appendChild(wrapper);
        shadow.appendChild(style);
      }

      /**
       * Render session's statistics to the screen
       * @param {Number} pomodoroCount    the number of pomodoro sessions completed
       * @param {Number} shortCount       the number of short breaks
       * @param {Number} longCount        the number of long breaks
       * @param {Number} productiveTime   total number of minutes working
       * @param {Number} interruptedCount the number of time reset because of interruptions
       * @return {void} 
       */


      showModal(pomodoroCount, shortCount, longCount, productiveTime, interruptedCount) {
        let ul = this.sessionStatistics;
        
        ["Pomodoro Completed", "Short Breaks", "Long Breaks",
        "Interrupted Session", "Total Minutes Working"].forEach(function(info) {
          let li = document.createElement('li');
          li.setAttribute('class', 'session-statistics');
          switch(info) {
            case "Pomodoro Completed":
              li.innerHTML = `${info}: ${pomodoroCount}`;
              break;
            case "Short Breaks":
              li.innerHTML = `${info}: ${shortCount}`;
              break;
            case "Long Breaks":
              li.innerHTML = `${info}: ${longCount}`;
              break;
            case "Interrupted Session":
              li.innerHTML = `${info}: ${interruptedCount}`;
              break;
            case "Total Minutes Working":
              li.innerHTML = `${info}: ${productiveTime}`;
              break;
            default:
              li.innerHTML = "Buggy!";
          }
          ul.appendChild(li);
        });
      }


}

customElements.define('pomo-finish', PomoFinish);

export { PomoFinish };
