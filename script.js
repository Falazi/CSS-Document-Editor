
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
    </select> `


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
    </select> `


    )
}

function getOption(el) {

    const option = el.value;
    if (option === 'esc') return
    console.log(option);
    return option;


}
// changevar("--headerfont", "Arial")

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
create("h2", "Header Options", "#editor")

addchoicefont("Header Font", "--headerfont", ...fonts)


addchoice("Header Alignment", "--headeralign", "Left", "Center", "Right")


create("h2", "Paragraph Options", "#editor")


addchoicefont("Paragraph Font", "--paragraphfont", ...fonts)

addchoice("Paragraph Alignment", "--paragraphalign", "Left", "Center", "Right", "Justify")

