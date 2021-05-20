let playButton = document.getElementsByClassName("btn play-btn")[0];
playButton.click();


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


async function clickDifferent() {
  let container = document.getElementById("box");

  let StyleDict = {};
  container.childNodes.forEach((element) => {

    let spanBackgroundColor = element.style.backgroundColor;

    let colorDict = StyleDict[spanBackgroundColor];
    if (typeof colorDict === "undefined") {
      StyleDict[spanBackgroundColor] = {
        value: 0,
        elements: [element],
      };
      return;
    }
    StyleDict[spanBackgroundColor]["value"] = colorDict["value"] + 1;
    StyleDict[spanBackgroundColor]["elements"].push(element);
  });

  
  for (const [color, colorDict] of Object.entries(StyleDict)) {
    if (colorDict.value === 0) {
      colorDict.elements[0].click();
    }
  }
}


var observer = new MutationObserver(async () => {
  await sleep(1)
  await clickDifferent();
})

let container = document.getElementById("box");
var config = { attributes: true, childList: true, characterData: true };
observer.observe(container, config)

