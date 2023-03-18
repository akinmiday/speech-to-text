const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // same as <=>document.querySelector("#search-form input")//

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    console.log("Your browser supports speech recognition");

    searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fa fa-microphone"></i></button>');
    const micBtn = searchForm.querySelector("button");
    const micIcon = micBtn.querySelector("i");

    const recognition = new SpeechRecognition();
     recognition.continuous = true; 
    //    recognition.interimResults = true;

    micBtn.addEventListener("click", micBtnClick);
     function micBtnClick() {
        if (micIcon.classList.contains("fa-microphone")) 
        { // start speech recognition//
            recognition.start();
        }

        else 
        { //stop speech recognition)
            recognition.stop();
        }
     }

     recognition.addEventListener("start", startSpeechRecognition) // recognition.onstart = function(){}

     function startSpeechRecognition() {   
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-microphone-slash");
        searchFormInput.focus();
        console.log("Speech Recognition active");
     }
     
     recognition.addEventListener("end", endSpeechRecognition); // recognition.onend = function(){}

     function endSpeechRecognition() {   
        micIcon.classList.remove("fa-microphone-slash");
        micIcon.classList.add("fa-microphone");
        searchFormInput.focus();
        console.log("Speech recognition Disconnected");
     }


     recognition.addEventListener("result", resultOfSpeechRecognition); // recognition.onresult = function(event){..}
        function resultOfSpeechRecognition(event) {
            const currentResultIndex = event.resultIndex;
            const transcript = event.results[currentResultIndex][0].transcript;
            searchFormInput.value = transcript; // print value out//

            
            if(transcript.toLowerCase().trim()==="stop recording") {
                recognition.stop();
            }
            else if(!searchFormInput.value){
                searchFormInput.value = transcript;
            }
            else{
               if(transcript.toLowerCase().trim()==="go"){
                searchForm.submit();
               } 
               else if(transcript.toLowerCase().trim()==="delete"){
                searchFormInput.value="";
               }
               else{
                searchFormInput.value = transcript
               }
            }


        //     setTimeout(()=> {
        //         searchForm.submit();
        //     }, 1000);
         }
}
else{
    console.log("Your browser does not supports speech recognition");
}