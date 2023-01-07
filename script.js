

function create(el, text, appendto) {
    const para = document.createElement(el);
    const node = document.createTextNode(text);
    para.appendChild(node);
    const element = document.querySelector(appendto);
    element.appendChild(para);
}

// Get the root element
var r = document.querySelector(':root');

// Create a function for getting a variable value
function myFunction_get() {
    // Get the styles (properties and values) for the root
    var rs = getComputedStyle(r);
    // Alert the value of the --blue variable
    alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
}


// Create a function for setting a variable value
function changevar(variable, newval) {
    // Set the value of variable --blue to another value (in this case "lightblue")
    r.style.setProperty(variable, newval);
}

//removes class from element if its in a list
function removeClass(element, classNames) {
    classNames.forEach(className => {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    });
}


function changeclass(event) {


    // the select element
    var selectElement = event.target;

    // the id of it
    var selectElid = event.target.id;

    console.log("this is:" + selectElid)

    // the value of the selection
    var value = selectElement.value;
    const para = document.querySelectorAll('img');

    var images = document.getElementsByTagName("img");
    console.log(images)


    para.forEach(el => {

        function removefrom(id, list) {
            if (selectElid === id) {
                removeClass(el, list)
            }

        }


        removefrom("--imagealign", ["Left", "Right", "Center"])

        // if (selectElid === "--imagealign") {
        //     removeClass(el, ["Left-class", "Right-class", "Center-class"])
        // }


        el.classList.toggle(`${value}`);
    })

}

function addchoiceclass(label, variable, ...others) {
    var choices = ""
    for (let val of others) {
        choices += `<option value="${val}">${val}</option>`
    }

    add(
        ` <label for="${label}">${label}:</label>

    <select name="${label}" id="${variable}" onchange="changeclass(event)">
        ${choices}
    </select> <br>`


    )
}


function add(htmlstring) {
    editor.insertAdjacentHTML('beforeend', htmlstring);
}

function addchoice(label, variable, ...others) {
    var choices = ""
    for (let val of others) {
        choices += `<option value="${val}">${val}</option>`
    }

    add(
        ` <label for="${label}">${label}:</label>

    <select name="${label}" id="${variable}" onchange="handleSelectChange(event)">
        ${choices}
    </select> <br>`


    )
}

function textchange(text, id) {
    changevar(id, text + "px")
}

// add text box choice
function addchoicetext(label, variable, inputtype, defaulttext) {

    add(
        ` <label for="${variable}">${label}:</label>

      <input type="${inputtype}" min="0" step="10" value="${defaulttext}"  id="${variable}" oninput="textchange(this.value, this.id)"><span style="margin-left:10px;">px</span>
    <br>
      `


    )
}


// like the addchoice function but it shows the options in their actual font
function addchoicefont(label, variable, ...others) {
    var choices = ""
    for (let val of others) {
        choices += `<option style="font-family:${val}" value="${val}">${val}</option>`
    }

    add(
        ` <label for="${label}">${label}:</label>
        <select name="${label}" id="${variable}" onchange="handleSelectChange(event)">
            ${choices}
        </select> <br>`


    )
}

function getOption(el) {

    const option = el.value;
    if (option === 'esc') return
    console.log(option);
    return option;


}
// changevar("--headerfont", "Arial")

// change default selected option in a select box
function changedefaultop(selectid, option) {
    document.querySelector(selectid).value = option;
}

function handleSelectChange(event) {

    // if you want to support some really old IEs, add
    // event = event || window.event;

    // the select element
    var selectElement = event.target;

    // the id of it
    var selectElid = event.target.id;


    // the value of the selection
    var value = selectElement.value;
    // to support really old browsers, you may use
    // selectElement.value || selectElement.options[selectElement.selectedIndex].value;
    // like el Dude has suggested
    console.log(selectElement.id)
    // do whatever you want with value
    changevar(selectElid, value)
}

const fonts = ["Arial", "Times New Roman", "Georgia"]

create("h2", "Header", "#editor")

addchoicefont("Header Font", "--headerfont", ...fonts)

addchoice("Header Alignment", "--headeralign", "Left", "Center", "Right")


create("h2", "Paragraph", "#editor")


addchoicefont("Paragraph Font", "--paragraphfont", ...fonts)

addchoice("Paragraph Alignment", "--paragraphalign", "Left", "Center", "Right", "Justify")

create("h2", "Image", "#editor")


// these options are experimentals

addchoiceclass("Image Alignment", "--imagealign", "Left", "Center", "Right")

changedefaultop("#--imagealign", "Center")


addchoicetext("Image Max Size", "--imagemaxsize", "number", "500")




addchoice("Image Float", "--imagefloat", "Left", "None", "Right")
changedefaultop("#--imagefloat", "None")
