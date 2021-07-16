const Speech = new webkitSpeechRecognition();
//add speech grammar list
const SpeechRecognitionList = new webkitSpeechGrammarList();
const commands = ["create new folder", "add function"];
const grammar =
  "#JSGF V1.0; grammar commands; public <command> = " +
  commands.join(" | ") +
  " ;";
SpeechRecognitionList.addFromString(grammar, 1);
Speech.grammars = SpeechRecognitionList;

Speech.interimResults = true;

const showCommands = () => {
  let commandHtml = "";
  commands.forEach(function (item) {
    console.log({ item });
    commandHtml += "<span> " + item + " </span>";
  });
  const hints = document.querySelector(".hints");
  hints.innerHTML = "When recording has started , Try " + commandHtml + ".";
};

Speech.onresult = (event) => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transc = "";
    if (event.results[i].isFinal) {
      transc += event.results[i][0].transcript;
      window.newTranscript(transc);
      document.querySelector(".output").innerText = encodeURI(transc);
    }
  }
};
Speech.onstart = (event) => {
  showCommands();
  document.querySelector(".status").innerText = "Recording started";
  window.newStart(event);
  if (document.querySelector(".start-button").classList.contains("show")) {
    document.querySelector(".start-button").classList.remove("show");
  }
};
Speech.onerror = (event) => {
  document.querySelector(".error").innerText = "Something went wrong! Try again later.";
  window.newError(event.error);
}
Speech.onend = (event) => {
  document.querySelector(".status").innerText = "Recording stopped!!";
  window.newEnd(event);
  document.querySelector(".start-button").classList.add("show");
};
/* Speech.onnomatch = (event) => window.newNoMatch(event)
                Speech.onresult = (event) => window.newResult(event)
                Speech.onspeechstart = (event) => window.newSpeechStart(event)
                Speech.onspeechend = (event) => window.newSpeechEnd(event) */

function startRecording(continuous) {
  Speech.continuous = continuous;
  Speech.start();
}

window.newReady();
